import {
  Anchor,
  Container,
  Group,
  Image,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
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
import { useScrollIntoView } from "@mantine/hooks";

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
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();

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
      <Group direction="row">
        <Paper
          className="hike-contents"
          style={{
            minWidth: 150,
            maxWidth: 300,
          }}
        >
          {hike.days ? <HikeContents /> : "loading"}
        </Paper>{" "}
        <Paper
          mt={60}
          style={{ width: "75%", height: 800, overflowY: "scroll" }}
          className="textinfo-container"
          ref={scrollableRef}
        >
          <Container fluid>
            <Container>
              <Title order={3}>{hike.title}</Title>
              <Space h="sm" />
              <Text>
                {hike.startLocation},{" "}
                {countries.find((c) => c.value === hike.countryRef).label}
              </Text>
              <Space h="sm" />
              <Text>Total distance: {findDistance(hike)} km</Text>
              <Space h="sm" />
              <Text>Total elevation gain: {findElevation(hike)} m</Text>
              <Space h="sm" />
              <Text>
                Total estimated hiking time: {findDuration(hike)} hours
              </Text>
              <Space h="sm" />
              <Text>
                Recommended seasons:{" "}
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
                    <Anchor href={`#${d.title}`}>{d.title}</Anchor>
                    <Space h="sm" />
                    <Text>{d.description}</Text>
                    <Space h="md" />
                    <Container>
                      {d.stages.map((s) => {
                        return (
                          <div key={s.id}>
                            <Text>{s.title}</Text>
                            <Space h="sm" />
                            <Text>{s.description}</Text>
                            <Space h="sm" />
                            <Text>Stage distance: {s.distance} km</Text>
                            <Space h="sm" />
                            <Text>Estimated hiking time: {s.duration}</Text>
                            <Space h="sm" />
                            <Text>Elevation gain: {s.elevation}</Text>
                            <Space h="sm" />
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
      </Group>
      <Container style={{ height: 800, width: "100%" }}>
        {!map ? "Loading" : <Map seedData={map.polylineArr} />}
      </Container>
    </Container>
  );
}
