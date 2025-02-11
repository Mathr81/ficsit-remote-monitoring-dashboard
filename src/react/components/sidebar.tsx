import { Box, Button, Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/joy';
import React, { type ReactElement, useEffect, useState } from 'react';
import { BsGearFill, BsGridFill, BsLightningFill, BsList } from 'react-icons/bs';
import { FaBoxes, FaCloud, FaMap, FaTruck, FaUser } from 'react-icons/fa';
import { GiFactory } from 'react-icons/gi';
import { MdTrain } from 'react-icons/md';
import { RiCoupon2Fill } from 'react-icons/ri';
import { TbDrone } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useAutoRefetch } from '../../hooks/useAutoRefetch';
import { PlayerDto } from '../../types/apis/dataTransferObject/playerDto';
import { PlayerFm } from '../../types/apis/frontModel/playerFm';
import { EndpointEnum } from '../../enums/endpoint.enum';

type LinksGroup = {
    path: string;
    label: string;
    icon: ReactElement;
    isDisabled: boolean;
};

export const Sidebar: React.FC = () => {
    const [isPlayerOnline, setIsPlayerOnline] = useState(false);
    const [isFullSize, setisFullSize] = useState(false);

    const { data: players } = useAutoRefetch<PlayerDto[], PlayerFm[]>(EndpointEnum.PLAYER);

    useEffect(() => {
        if (players) {
            setIsPlayerOnline(players.some((player) => !!player.online));
        }
    }, [players]);

    const linksGroup: LinksGroup[][] = [
        [
            {
                path: '/',
                label: 'Overview',
                icon: <BsGridFill />,
                isDisabled: false
            },
            {
                path: '/players',
                label: 'Players',
                icon: <FaUser />,
                isDisabled: false
            },
            {
                path: '/power',
                label: 'Power Screen',
                icon: <BsLightningFill />,
                isDisabled: false
            },
            {
                path: '/production',
                label: 'Production',
                icon: <GiFactory />,
                isDisabled: false
            },
            {
                path: '/vehicles',
                label: 'Vehicles',
                icon: <FaTruck />,
                isDisabled: false
            },
            {
                path: '/drones',
                label: 'Drones',
                icon: <TbDrone />,
                isDisabled: false
            },
            {
                path: '/trains',
                label: 'Trains',
                icon: <MdTrain />,
                isDisabled: false
            },
            {
                path: '/storageView',
                label: 'Storage View',
                icon: <FaBoxes />,
                isDisabled: false
            },
            {
                path: '/cloudView',
                label: 'Cloud View',
                icon: <FaCloud />,
                isDisabled: false
            },
            {
                path: '/awesomeSink',
                label: 'Awesome Sink',
                icon: <RiCoupon2Fill />,
                isDisabled: false
            },
            {
                path: '/map',
                label: 'Map',
                icon: <FaMap />,
                isDisabled: false
            }
        ],
        [
            {
                path: '/settings',
                label: 'Settings',
                icon: <BsGearFill />,
                isDisabled: false
            }
        ]
    ];

    return (
        <Box
            sx={{
                width: isFullSize ? '180px' : undefined,
                height: '100vh',
                position: 'sticky',
                top: '0px',
                bottom: '0px',
                left: '0px',
                backgroundColor: 'var(--joy-palette-background-surface)',
                padding: '12px'
            }}
        >
            <Stack spacing={isFullSize ? 2 : 1}>
                {isFullSize ? (
                    <Grid container display="flex" alignItems="center">
                        <Grid marginRight="6px">
                            <IconButton
                                onClick={() => {
                                    setisFullSize(false);
                                }}
                                color="neutral"
                                variant="plain"
                            >
                                <BsList />
                            </IconButton>
                        </Grid>
                        <Grid xs>
                            <Typography level="h4">Steelport</Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Tooltip placement="right" title="Expand Menu">
                        <IconButton
                            size="lg"
                            onClick={() => {
                                setisFullSize(true);
                            }}
                            color="neutral"
                            variant="plain"
                        >
                            <BsList />
                        </IconButton>
                    </Tooltip>
                )}
                {linksGroup.map((group) => {
                    return (
                        <React.Fragment key={crypto.randomUUID()}>
                            <Divider />
                            {group.map((link) => {
                                if (link.isDisabled) return null;
                                if (isFullSize) {
                                    return (
                                        <Link
                                            key={link.path}
                                            style={{ textDecoration: 'none' }}
                                            to={link.path}
                                        >
                                            <Button
                                                fullWidth
                                                color="neutral"
                                                variant="soft"
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start'
                                                }}
                                                startDecorator={link.icon}
                                            >
                                                {link.label}
                                            </Button>
                                        </Link>
                                    );
                                }
                                return (
                                    <Tooltip key={link.path} placement="right" title={link.label}>
                                        <Link style={{ textDecoration: 'none' }} to={link.path}>
                                            <IconButton size="lg" color="neutral" variant="plain">
                                                {link.icon}
                                                {link.label === 'Players' && isPlayerOnline && (
                                                    <span
                                                        style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            right: '5px',
                                                            height: '10px',
                                                            width: '10px',
                                                            backgroundColor: isPlayerOnline
                                                                ? 'green'
                                                                : 'red',
                                                            borderRadius: '50%',
                                                            display: 'inline-block'
                                                        }}
                                                    ></span>
                                                )}
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </Stack>
        </Box>
    );
};
