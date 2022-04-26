import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HikeCard } from "../../components/HikeCard";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchAllHikes } from "../../store/hike/actions";
import { selectAllHikes } from "../../store/hike/selectors";
import { tags } from "../../config/tags";
import { noImage } from "../../config/constants";
import { Grid } from "@mantine/core";
import { countries } from "../../config/countries";
import {
  selectCountryFilter,
  selectDayFilter,
  selectSeasonFilter,
} from "../../store/filter/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAppLoading);
  const allHikes = useSelector(selectAllHikes);
  const filterCountries = useSelector(selectCountryFilter);
  const filterDays = useSelector(selectDayFilter);
  const filterSeasons = useSelector(selectSeasonFilter);

  useEffect(() => {
    dispatch(fetchAllHikes);
  }, [dispatch]);

  let filteredHikes = allHikes;

  if (filterCountries.length !== 0) {
    filteredHikes = allHikes.filter((h) => {
      return filterCountries.includes(h.countryRef);
    });
  }

  if (filterDays === "2") {
    filteredHikes = filteredHikes.filter((h) => {
      return h.days.length > 1;
    });
  } else if (filterDays === "1") {
    filteredHikes = filteredHikes.filter((h) => {
      return h.days.length === 1;
    });
  }

  filteredHikes = filteredHikes.filter((h) => {
    let present = false;
    for (let i = 0; i < filterSeasons.length; i++) {
      if (h.seasonRefs.includes(parseInt(filterSeasons[i]))) {
        return (present = true);
      }
    }
    return present;
  });

  return (
    <div className="homepage-body" style={{ display: "flex", width: "100%" }}>
      <Grid pt={20} width={300}>
        {loading
          ? "Loading"
          : filteredHikes.map((hike) => {
              const {
                coverImage,
                title,
                description,
                countryRef,
                badgeIds,
                id,
              } = hike;
              const badges = badgeIds
                ? tags.filter((tag) => {
                    return badgeIds.includes(tag.id);
                  })
                : tags;
              const country = countries.find((country) => {
                return countryRef === country.value;
              });
              let summaryDescription = description;
              description.length > 150
                ? (summaryDescription = `${description.substring(0, 150)}...`)
                : (summaryDescription = description);
              return (
                <Grid.Col key={id} sm={6} md={4} lg={3} xl={2}>
                  <HikeCard
                    title={title}
                    image={coverImage ? coverImage : noImage}
                    description={summaryDescription}
                    country={country}
                    badges={badges}
                  />
                </Grid.Col>
              );
            })}
      </Grid>
    </div>
  );
}
