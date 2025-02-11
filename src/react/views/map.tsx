import {
    Box,
    Card,
    CardContent,
    Container,
    Typography
} from '@mui/joy';
import React from 'react';
import { useAutoRefetch } from '../../hooks/useAutoRefetch';
import { EndpointEnum } from '../../enums/endpoint.enum';
import { PlayerDto } from '../../types/apis/dataTransferObject/playerDto';
import { PlayerFm } from '../../types/apis/frontModel/playerFm';
import L from 'leaflet';

// Satisfactory world coordinate bounds (from the image)
const WORLD_MIN_X = -340000;
const WORLD_MAX_X = 457200;
const WORLD_MIN_Y = -345000;
const WORLD_MAX_Y = 335000;

// Convert game coordinates to relative percentages for positioning
const convertCoordinates = (x: number, y: number) => {
    const percentX = ((x - WORLD_MIN_X) / (WORLD_MAX_X - WORLD_MIN_X)) * 100;
    const percentY = ((y - WORLD_MIN_Y) / (WORLD_MAX_Y - WORLD_MIN_Y)) * 100; // Fixed Y flip

    return { left: `${percentX}%`, top: `${percentY}%` };
};

export const Map: React.FC = () => {
    const { data: players } = useAutoRefetch<PlayerDto[], PlayerFm[]>(EndpointEnum.PLAYER);

    return (
        <Container sx={{ paddingTop: '50px' }}>
            <Card variant="outlined" sx={{ marginBottom: '30px' }}>
                <CardContent>
                    <Typography level="h2" fontWeight={600}>
                        Players
                    </Typography>
                </CardContent>
            </Card>

            <CardContent>
                <Box sx={{ marginTop: '20px', position: 'relative' }}>
                    <img
                        src="/assets/Misc/Map.png"
                        alt="Map illustration"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px'
                        }}
                    />

                    {players &&
                        players.map((player) => {
                            // Convert player coordinates
                            const dotPosition = convertCoordinates(player.location.x, player.location.y);

                            return (
                                <Box
                                    key={player.id}
                                    sx={{
                                        position: 'absolute',
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        backgroundColor: player.online ? 'green' : 'red',
                                        border: '2px solid white',
                                        transform: 'translate(-50%, -50%)',
                                        ...dotPosition
                                    }}
                                    title={player.name}
                                />
                            );
                        })}
                </Box>
            </CardContent>
        </Container>
    );
};
