import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    Chip,
    LinearProgress,
    Table
} from '@mui/joy';
import React from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import { useAutoRefetch } from '../../hooks/useAutoRefetch';
import { EndpointEnum } from '../../enums/endpoint.enum';
import { InventoryEntity, PlayerDto } from '../../types/apis/dataTransferObject/playerDto';
import { PlayerFm } from '../../types/apis/frontModel/playerFm';
import { playerMap } from '../../constants/playerMap';
import { getImageHelper } from '../../helpers/getImage.helper';

export const Players: React.FC = () => {
    const { data: players } = useAutoRefetch<PlayerDto[], PlayerFm[]>(EndpointEnum.PLAYER);

    const getPlayerName = (id: string) => {
        return playerMap[id as keyof typeof playerMap] || 'Unknown Player';
    };

    const getTotalInventoryAmount = (inventory: InventoryEntity[] | null | undefined): number => {
        return inventory?.reduce((total, item) => total + item.Amount, 0) || 0;
    };

    return (
        <Container sx={{ paddingTop: '50px' }}>
            <Card variant="outlined" sx={{ marginBottom: '30px' }}>
                <CardContent>
                    <Typography level="h2" fontWeight={600}>
                        Players
                    </Typography>
                </CardContent>
            </Card>
            {players ? (
                <>
                    {players.map((player) => {
                        return (
                            <Card
                                key={player.id}
                                variant="outlined"
                                sx={{ marginBottom: '30px', padding: '20px' }}
                            >
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid xs>
                                            <Grid container alignItems="center">
                                                <Typography level="h3" sx={{ marginRight: '12px' }}>
                                                    {getPlayerName(player.id.toString())}
                                                </Typography>
                                                <Typography
                                                    level="body-md"
                                                    sx={{ marginLeft: '12px' }}
                                                >
                                                    Health
                                                </Typography>
                                                <Typography
                                                    level="body-sm"
                                                    sx={{ marginLeft: '4px', marginBottom: '1px' }}
                                                >
                                                    ({player.playerHP.toFixed(0)}%)
                                                </Typography>
                                                <LinearProgress
                                                    determinate
                                                    value={player.playerHP}
                                                    color="primary"
                                                    sx={{ marginLeft: '8px', marginBottom: '1px' }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            {!player.online ? (
                                                <Chip
                                                    variant="soft"
                                                    startDecorator={<BsX size="17px" />}
                                                    color="danger"
                                                >
                                                    Offline
                                                </Chip>
                                            ) : (
                                                <Chip
                                                    variant="soft"
                                                    startDecorator={<BsCheck size="22px" />}
                                                    color="success"
                                                >
                                                    Online
                                                </Chip>
                                            )}
                                        </Grid>
                                    </Grid>

                                    {/* Player Location */}
                                    {/* <Box sx={{ marginTop: '10px' }}>
                                        <Typography level="body-md">
                                            Location: ({player.location.x.toFixed(2)},{' '}
                                            {player.location.y.toFixed(2)},{' '}
                                            {player.location.z.toFixed(2)})
                                        </Typography>
                                        <Typography level="body-md">
                                            Rotation: {player.location.rotation.toFixed(2)}°
                                        </Typography>
                                    </Box> */}

                                    <Box sx={{ marginTop: '20px' }}>
                                        <Grid container alignItems="center">
                                            <Typography fontWeight={600}>Inventory</Typography>
                                            <Typography level="body-sm" sx={{ marginLeft: '4px' }}>
                                                (
                                                {getTotalInventoryAmount(
                                                    player.inventory
                                                ).toLocaleString()}
                                                )
                                            </Typography>
                                        </Grid>
                                        <Box
                                            sx={{
                                                maxHeight: '235px',
                                                overflowY: 'auto'
                                            }}
                                        >
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Item</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {player.inventory?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            getImageHelper(
                                                                                item.ClassName
                                                                            ) ?? null
                                                                        }
                                                                        alt="Satisfactory item illustration"
                                                                        onError={(e) => {
                                                                            e.currentTarget.src = `/assets/Icon/notFound.png`;
                                                                        }}
                                                                        style={{
                                                                            height: '24px',
                                                                            width: '24px',
                                                                            marginRight: '8px'
                                                                        }}
                                                                    />
                                                                    {item.Name}
                                                                </Box>
                                                            </td>
                                                            <td>{item.Amount}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        );
                    })}
                </>
            ) : (
                <Card sx={{ marginBottom: '30px', padding: '20px', opacity: 0.5 }}>
                    <CardContent>
                        <Typography level="h4">Loading Players...</Typography>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};
