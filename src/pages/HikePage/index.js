import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Map from "../../components/Map";
import { fetchHikeById } from "../../store/hike/actions";
import { selectCurrentMap } from "../../store/hike/selectors";

export default function HikePage() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHikeById(params.id));
  }, [dispatch, params.id]);

  const map = useSelector(selectCurrentMap);
  return !map ? "Loading" : <Map />;
}
