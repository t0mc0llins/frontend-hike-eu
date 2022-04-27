import { Container, Group, Stack, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HikeContents } from "../../components/HikeContents";
import Map from "../../components/Map";
import { countries } from "../../config/countries";
import { seasons } from "../../config/seasons";
import { setPage } from "../../store/appState/actions";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchHikeById } from "../../store/hike/actions";
import { titleCase } from "title-case";
import {
  selectCurrentHike,
  selectCurrentMap,
} from "../../store/hike/selectors";

export default function HikePage() {
  const params = useParams();
  const dispatch = useDispatch();
  const hike = useSelector(selectCurrentHike);
  const loading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(setPage("hike"));
  }, []);

  useEffect(() => {
    dispatch(fetchHikeById(params.id));
  }, [dispatch, params.id]);

  const map = useSelector(selectCurrentMap);
  return loading || !countries || !hike.days ? (
    "loading"
  ) : (
    <Container style={{ height: "100%", width: "100%" }}>
      <Group>
        <Stack>{hike.days ? <HikeContents /> : "loading"}</Stack>{" "}
        <Container>
          <Title order={3}>{hike.title}</Title>
          <Text>
            {hike.startLocation},{" "}
            {countries.find((c) => c.value === hike.countryRef).label}
          </Text>
          <Text>
            Recommended seasons:{" "}
            {hike.seasonRefs.map((s) => {
              const season = seasons.find((d) => d.id === s);
              return `${titleCase(season.label.toLowerCase())}  `;
            })}
          </Text>
        </Container>
      </Group>
      <Container style={{ height: 800, width: "100%" }}>
        {!map ? "Loading" : <Map seedData={map.polylineArr} />}
      </Container>
    </Container>
  );
}
