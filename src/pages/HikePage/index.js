import {
  Container,
  Divider,
  Image,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const findDistance = (hike) => {
  let total = 0;
  for (let i = 0; hike.days.length > i; i++) {
    for (let j = 0; hike.days[i].stages.length > j; j++) {
      total += hike.days[i].stages[j].distance;
    }
  }
  return total;
};

const findElevation = (hike) => {
  let total = 0;
  for (let i = 0; hike.days.length > i; i++) {
    for (let j = 0; hike.days[i].stages.length > j; j++) {
      total += hike.days[i].stages[j].elevation;
    }
  }
  return total;
};

const findDuration = (hike) => {
  let total = 0;
  for (let i = 0; hike.days.length > i; i++) {
    for (let j = 0; hike.days[i].stages.length > j; j++) {
      total += hike.days[i].stages[j].duration;
    }
  }
  return total;
};

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
  return loading || !countries || !hike.days || !hike.days[0].stages ? (
    "loading"
  ) : (
    <Container fluid>
      <Paper
        p={30}
        ml={70}
        mt={30}
        style={{ width: "80%" }}
        className="textinfo-container"
      >
        <Container fluid>
          <Container>
            <Title id={hike.title} order={2}>
              {hike.title}
            </Title>
            <Space h="sm" />
            <Text>
              {hike.startLocation},{" "}
              {countries.find((c) => c.value === hike.countryRef).label}
            </Text>
            <Space h="sm" />
            <Text>
              <strong>Total distance</strong>: {findDistance(hike)} km
            </Text>
            <Space h="sm" />
            <Text>
              <strong>Total elevation gain</strong>: {findElevation(hike)} m
            </Text>
            <Space h="sm" />
            <Text>
              <strong>Total estimated hiking time</strong>: {findDuration(hike)}{" "}
              hours
            </Text>
            <Space h="sm" />
            <Text>
              <strong>Recommended seasons</strong>:{" "}
              {hike.seasonRefs.map((s) => {
                const season = seasons.find((d) => d.id === s);
                return `${titleCase(season.label.toLowerCase())}  `;
              })}
            </Text>
            <Space h="md" />
            <Image
              sx={{ maxWidth: 500 }}
              src={hike.coverImage}
              radius="md"
              caption={hike.description}
            />
            <Space h="xl" />
          </Container>
          <Container className="days-container">
            {hike.days.map((d) => {
              return (
                <div key={d.id} id={d.title}>
                  <Space h="md" />
                  <Divider size="sm" />
                  <Space h="md" />
                  <Title order={3}>{d.title}</Title>
                  <Space h="sm" />
                  <Text>{d.description}</Text>
                  <Space h="md" />
                  <Container>
                    {d.stages.map((s) => {
                      return (
                        <div key={s.id} id={s.title}>
                          <Space h="sm" />
                          <Divider size="xs" />
                          <Space h="sm" />
                          <Title order={4}>{s.title}</Title>
                          <Space h="sm" />
                          <Text>{s.description}</Text>
                          <Space h="sm" />
                          <Text>Stage distance: {s.distance} km</Text>
                          <Space h="sm" />
                          <Text>Estimated hiking time: {s.duration}</Text>
                          <Space h="sm" />
                          <Text>Elevation gain: {s.elevation}</Text>
                        </div>
                      );
                    })}
                  </Container>
                </div>
              );
            })}
          </Container>
        </Container>
      </Paper>
      <Container id="map" style={{ height: 800, width: "100%" }}>
        {!map ? "Loading" : <Map seedData={JSON.parse(map.polylineArr)} />}
      </Container>
    </Container>
  );
}
