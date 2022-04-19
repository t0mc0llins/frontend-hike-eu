import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HikeCard } from "../../components/HikeCard";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchAllHikes } from "../../store/hike/actions";
import { selectAllHikes } from "../../store/hike/selectors";
import { tags } from "../../config/tags";

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
        <div className="artwork-list">
          {loading
            ? "Loading"
            : hikes.map((hike) => {
                const { imageUrl, title, description, country, badgeIds } =
                  hike;
                const badges = tags.filter((tag) => {
                  return badgeIds.includes(tag.id);
                });
                return (
                  <HikeCard
                    title={title}
                    image={imageUrl}
                    description={description}
                    country={country}
                    badges={badges}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}
