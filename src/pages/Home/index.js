import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HikeCard } from "../../components/HikeCard";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchAllHikes } from "../../store/hike/actions";
import { selectAllHikes } from "../../store/hike/selectors";
import { tags } from "../../config/tags";
import { noImage } from "../../config/constants";
import { Grid } from "@mantine/core";

export default function HomePage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(fetchAllHikes);
  }, [dispatch]);

  const hikes = useSelector(selectAllHikes);

  return (
    <div>
      <h1>Home</h1>
      <div className="homepage-body">
        <Grid>
          {loading
            ? "Loading"
            : hikes.map((hike) => {
                const {
                  coverImage,
                  title,
                  description,
                  country,
                  badgeIds,
                  id,
                } = hike;
                const badges = tags.filter((tag) => {
                  return badgeIds.includes(tag.id);
                });
                return (
                  <Grid.Col span={2}>
                    <HikeCard
                      key={id}
                      title={title}
                      image={coverImage ? coverImage : noImage}
                      description={description}
                      country={country}
                      badges={badges}
                    />
                  </Grid.Col>
                );
              })}
        </Grid>
      </div>
    </div>
  );
}
