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

export default function HomePage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(fetchAllHikes);
  }, [dispatch]);

  const hikes = useSelector(selectAllHikes);

  return (
    <div className="homepage-body" style={{ display: "flex", width: "100%" }}>
      <Grid pt={20} width={300}>
        {loading
          ? "Loading"
          : hikes.map((hike) => {
              const {
                coverImage,
                title,
                description,
                countryRef,
                badgeIds,
                id,
              } = hike;
              const badges = tags.filter((tag) => {
                return badgeIds.includes(tag.id);
              });
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
