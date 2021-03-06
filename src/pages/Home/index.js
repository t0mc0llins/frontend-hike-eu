import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HikeCard } from "../../components/HikeCard";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchAllHikes } from "../../store/hike/actions";
import { selectAllHikes } from "../../store/hike/selectors";
import { tags } from "../../config/tags";
import { noImage } from "../../config/constants";
import { Center, Grid, Loader } from "@mantine/core";
import { countries } from "../../config/countries";
import {
  selectCountryFilter,
  selectDayFilter,
  selectSearchFilter,
  selectSeasonFilter,
} from "../../store/filter/selectors";
import { setPage } from "../../store/appState/actions";

export default function HomePage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAppLoading);
  const allHikes = useSelector(selectAllHikes);
  const filterCountries = useSelector(selectCountryFilter);
  const filterDays = useSelector(selectDayFilter);
  const filterSeasons = useSelector(selectSeasonFilter);
  const filterSearch = useSelector(selectSearchFilter);

  useEffect(() => {
    dispatch(setPage("home"));
  }, []);

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

  filteredHikes = filteredHikes.filter((h) => {
    const country = countries.find((country) => {
      return h.countryRef === country.value;
    });
    return (
      h.title.toLowerCase().includes(filterSearch.toLowerCase().trim()) ||
      country.label.toLowerCase().includes(filterSearch.toLowerCase().trim())
    );
  });

  return (
    <div className="homepage-body" style={{ display: "flex", width: "100%" }}>
      <Grid pt={20} style={{ width: "100%" }}>
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          filteredHikes.map((hike) => {
            const { coverImage, title, description, countryRef, badgeIds, id } =
              hike;
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
                  id={id}
                  title={title}
                  image={coverImage ? coverImage : noImage}
                  description={summaryDescription}
                  country={country}
                  badges={badges}
                />
              </Grid.Col>
            );
          })
        )}
      </Grid>
    </div>
  );
}
