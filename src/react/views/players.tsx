import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Chip,
  LinearProgress,
  Table,
} from "@mui/joy";
import React from "react";
import { BsCheck, BsX } from "react-icons/bs";
import { useAutoRefetch } from "../../hooks/useAutoRefetch";
import { EndpointEnum } from "../../enums/endpoint.enum";
import { PlayerDto } from "../../types/apis/dataTransferObject/playerDto";
import { PlayerFm } from "../../types/apis/frontModel/playerFm";
import { playerMap } from "../../constants/playerMap";

export const Players: React.FC = () => {
  const { data: players } = useAutoRefetch<PlayerDto[], PlayerFm[]>(
    EndpointEnum.PLAYER
  );

  const getPlayerName = (id: string) => {
    return playerMap[id as keyof typeof playerMap] || "Unknown Player";
  };

  return (
    <Container sx={{ paddingTop: "50px" }}>
      <Card variant="outlined" sx={{ marginBottom: "30px" }}>
        <CardContent>
          <Typography level="h2" fontWeight={600}>Players</Typography>
        </CardContent>
      </Card>
      {players ? (
        <>
          {players.map((player) => {
            return (
              <Card key={player.id} variant="outlined" sx={{ marginBottom: "30px", padding: "20px" }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid xs>
                      <Grid>
                      <Typography level="h4">{getPlayerName(player.id.toString())}</Typography><Typography level="body-md">Heath</Typography>
                      </Grid>
                    </Grid>
                    <Grid>
                      {!player.online ? (
                        <Chip variant="soft" startDecorator={<BsX size="17px" />} color="danger">
                          Offline
                        </Chip>
                      ) : (
                        <Chip variant="soft" startDecorator={<BsCheck size="22px" />} color="success">
                          Online
                        </Chip>
                      )}
                    </Grid>
                  </Grid>

                  {/* Player Health Bar */}
                  <Box sx={{ marginTop: "10px" }}>
                    <Typography level="body-md">Health: {player.playerHP}%</Typography>
                    <LinearProgress determinate value={player.playerHP} color="primary" />
                  </Box>

                  {/* Player Location */}
                  <Box sx={{ marginTop: "10px" }}>
                    <Typography level="body-md">Location: ({player.location.x.toFixed(2)}, {player.location.y.toFixed(2)}, {player.location.z.toFixed(2)})</Typography>
                    <Typography level="body-md">Rotation: {player.location.rotation.toFixed(2)}°</Typography>
                  </Box>

                  {/* Last Online Timestamp */}
                  {!player.online && (
                    <Box sx={{ marginTop: "10px" }}>
                      <Typography level="body-md" color="neutral">
                        Last Online: {new Date().toLocaleString()}
                      </Typography>
                    </Box>
                  )}

                  {/* Player Inventory */}
                  <Box sx={{ marginTop: "20px" }}>
                    <Typography fontWeight={600}>Inventory</Typography>
                    <Table>
                      {/* <Thead>
                        <Tr>
                          <Th>Item</Th>
                          <Th>Amount</Th>
                          <Th>Max</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {player.inventory?.map((item, index) => (
                          <Tr key={index}>
                            <Td>{item.Name}</Td>
                            <Td>{item.Amount}</Td>
                            <Td>{item.MaxAmount}</Td>
                          </Tr>
                        ))}
                      </Tbody> */}
                    </Table>
                  </Box>

                  {/* Player Equipment Placeholder */}
                  <Box sx={{ marginTop: "20px" }}>
                    <Typography fontWeight={600}>Equipment</Typography>
                    <Typography level="body-md">(Not yet implemented)</Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </>
      ) : (
        <Card sx={{ marginBottom: "30px", padding: "20px", opacity: 0.5 }}>
          <CardContent>
            <Typography level="h4">Loading Players...</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
