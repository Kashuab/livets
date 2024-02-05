import {DevtoolsStats} from "../../lib/middleware/devtools.ts";
import {createContext, useContext, useEffect, useState} from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem, AccordionPanel,
  Box, Button,
  Heading, Input, Select, SelectField, Tab, TabList, TabPanel, TabPanels, Tabs,
  Text
} from "@chakra-ui/react";
import { sentenceCase } from "change-case";
import { v4 } from 'uuid';
import 'react-json-view-lite/dist/index.css';
import ReactJson from "react-json-view";
import {ActionData} from "../../lib/Orchestrator.ts";

let abortController = new AbortController();

function App() {
  const [stats, setStats] = useState<DevtoolsStats | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      fetchStats().then(setStats);
    }, 100);

    return () => {
      clearInterval(id);
      abortController.abort();
      abortController = new AbortController();
    }
  }, []);

  if (!stats) return <h1>Loading...</h1>;

  return (
    <StatsContext.Provider value={stats}>
      {Object.entries(stats.activeRooms).map(([name, rooms]) => (
        <Box p={8}>
          <Heading>{sentenceCase(name)}</Heading>

          {Object.entries(rooms).map(([id, room]) => (
            <Box my={6}>
              <Text fontSize={18} fontWeight={600} mb={4}>#{id}</Text>

              <Box display="flex" gap={4}>
                <Box p={4} borderWidth={1} borderRadius="md">
                  <Text mb={4}>Action timeline</Text>
                  <Accordion>
                    {room.timeline.map(entry => (
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                              {entry.action.name}#{entry.action.id}
                            </Box>

                            <AccordionIcon />
                          </AccordionButton>
                        </h2>

                        <AccordionPanel>
                          <Tabs>
                            <TabList>
                              <Tab>
                                Arguments
                              </Tab>
                              <Tab>
                                State before
                              </Tab>
                              <Tab>
                                State after
                              </Tab>
                            </TabList>

                            <TabPanels>
                              <TabPanel>
                                <pre>
                                  {entry.action.args.map(arg => (
                                    <code>
                                      {JSON.stringify(arg, null, 2)}
                                    </code>
                                  ))}
                                </pre>
                              </TabPanel>
                              <TabPanel>
                                <ReactJson src={entry.stateBefore} />
                              </TabPanel>
                              <TabPanel>
                                <ReactJson src={entry.stateAfter} />
                              </TabPanel>
                            </TabPanels>
                          </Tabs>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Box>

                <Box p={4} borderWidth={1} borderRadius="md">
                  <Text mb={4}>Simulate an action</Text>

                  <ActionForm
                    roomId={id}
                    roomName={name}
                    actionNames={Object.values(stats.rooms.find(r => r.name === name)?.actionNames || {})}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </StatsContext.Provider>
  );
}

type ActionFormProps = {
  roomId: string;
  roomName: string;
  actionNames: string[];
}

function ActionForm(props: ActionFormProps) {
  const [action, setAction] = useState('');
  const [args, setArguments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <Box>
      <Select value={action} onChange={e => setAction(e.target.value)}>
        <option>Select an action...</option>
        {props.actionNames.map(name => <option>{name}</option>)}
      </Select>

      <Box w={400} display="flex" flexDirection="column">
        {args.map((a, i) => (
          <Input
            mt={4}
            value={a}
            onChange={e => setArguments(c => c.map((v, _i) => _i === i ? e.target.value : v))}
          />
        ))}
      </Box>

      <Box display="flex" gap={4} alignItems="center" mt={4}>
        <Button
          colorScheme="blue"
          onClick={async () => {
            setLoading(true);

            await simulateAction({
              id: `fake-${v4()}`,
              room: { type: props.roomName, id: props.roomId },
              name: action,
              args
            })

            setLoading(false);
          }}
          isLoading={loading}
        >
          Send
        </Button>

        <Button onClick={() => setArguments(c => [...c, ''])}>
          Add argument
        </Button>
      </Box>
    </Box>
  )
}

const StatsContext = createContext<DevtoolsStats | null>(null);

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === null) throw new Error('Stats context not available');

  return context;
}

async function simulateAction(action: ActionData): Promise<DevtoolsStats> {
  const res = await fetch('http://localhost:3000/devtools/action', {
    method: 'POST',
    signal: abortController.signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action),
  });

  return await res.json();
}

async function fetchStats(): Promise<DevtoolsStats> {
  const res = await fetch('http://localhost:3000/devtools/stats', {
    signal: abortController.signal
  });

  return await res.json();
}

export default App;
