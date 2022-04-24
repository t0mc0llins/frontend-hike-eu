import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Map from "../../components/Map";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchHikeById } from "../../store/hike/actions";
import { selectCurrentHike } from "../../store/hike/selectors";

export default function HikePage() {
  const params = useParams();
  const loading = useSelector(selectAppLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHikeById(params.id));
  }, [dispatch, params.id]);

  const hike = useSelector(selectCurrentHike);

  return <Map />;
}
