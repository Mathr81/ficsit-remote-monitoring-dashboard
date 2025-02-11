import { Box, Card, CardContent, Container, Typography } from '@mui/joy';
import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useAutoRefetch } from '../../hooks/useAutoRefetch';
import { EndpointEnum } from '../../enums/endpoint.enum';
import { PlayerDto } from '../../types/apis/dataTransferObject/playerDto';
import { PlayerFm } from '../../types/apis/frontModel/playerFm';

const WORLD_MIN_X = -340000;
const WORLD_MAX_X = 457200;
const WORLD_MIN_Y = -467200;
const WORLD_MAX_Y = 388000;

const convertCoordinates = (x: number, y: number) => {
    const percentX = ((x - WORLD_MIN_X) / (WORLD_MAX_X - WORLD_MIN_X)) * 100;
    const percentY = ((y - WORLD_MIN_Y) / (WORLD_MAX_Y - WORLD_MIN_Y)) * 100;

    return {
        left: `${Math.min(100, Math.max(0, percentX))}%`,
        top: `${Math.min(100, Math.max(0, percentY))}%`
    };
};

const Controls: React.FC<{ zoomIn: () => void; zoomOut: () => void; resetTransform: () => void }> = ({ 
    zoomIn, 
    zoomOut, 
    resetTransform 
}) => {
    return (
        <Box sx={{ 
            position: 'absolute', 
            right: 10, 
            top: 10, 
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
        }}>
            <button
                onClick={zoomIn}
                style={{
                    padding: '8px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                +
            </button>
            <button
                onClick={zoomOut}
                style={{
                    padding: '8px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                -
            </button>
            <button
                onClick={resetTransform}
                style={{
                    padding: '8px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Reset
            </button>
        </Box>
    );
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

            <Card>
                <CardContent>
                    <Box sx={{ 
                        position: 'relative', 
                        height: '1200px',
                        overflow: 'hidden',
                        borderRadius: '8px'
                    }}>
                        <TransformWrapper
                            initialScale={1}
                            minScale={0.5}
                            maxScale={4}
                            wheel={{ wheelDisabled: false }}
                            pinch={{ disabled: false }}
                        >
                            {(utils) => (
                                <>
                                    <Controls
                                        zoomIn={() => utils.zoomIn()}
                                        zoomOut={() => utils.zoomOut()}
                                        resetTransform={() => utils.resetTransform()}
                                    />
                                    <TransformComponent
                                        wrapperStyle={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    >
                                        <Box sx={{ position: 'relative' }}>
                                            <img
                                                src="/assets/Misc/Map.png"
                                                alt="Map illustration"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'block'
                                                }}
                                            />

                                            {players?.map((player) => {
                                                const dotPosition = convertCoordinates(
                                                    player.location.x,
                                                    player.location.y
                                                );

                                                return (
                                                    <Box
                                                        key={player.id}
                                                        sx={{
                                                            position: 'absolute',
                                                            width: 3,
                                                            height: 3,
                                                            borderRadius: '50%',
                                                            backgroundColor: player.online ? 'green' : 'red',
                                                            border: '0.1rem solid white',
                                                            transform: 'translate(-50%, -50%)',
                                                            ...dotPosition,
                                                            '&:hover': {
                                                                width: 8,
                                                                height: 8,
                                                                zIndex: 1
                                                            }
                                                        }}
                                                        title={player.name}
                                                    />
                                                );
                                            })}
                                        </Box>
                                    </TransformComponent>
                                </>
                            )}
                        </TransformWrapper>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};