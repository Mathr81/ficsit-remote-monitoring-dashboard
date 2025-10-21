import { useEffect, useState } from 'react';

import { defaultSettingsData } from '../constants/defaultSettingsData';
import { endPointDictionary } from '../dictionaries/endPoint.dictionary';
import { EndpointEnum } from '../enums/endpoint.enum';
import { FetchMethodsEnum } from '../enums/fetchMethods.enum';
import { fetcherHelper } from '../helpers/fetcher.helper';
import type { MapperFunction } from '../types/endpoint';
import type { FetchResponse } from '../types/fetchResponse';
import type { SettingsData } from '../types/settingsData';
import { useLocalStorage } from './useLocalStorage';

export const useAutoRefetch = <Dto, Fm>(
    endPoint?: EndpointEnum,
    skip?: boolean
): FetchResponse<Fm> => {
    const mapper = endPoint ? (endPointDictionary[endPoint] as MapperFunction<Dto, Fm>) : undefined;
    const { value: settings } = useLocalStorage<SettingsData>('rmd_settings', defaultSettingsData);

    const [responseState, setResponseState] = useState<FetchResponse<Fm>>({
        status: '',
        success: false
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (isMounted && !skip && mapper) {
                const isProduction = import.meta.env.PROD;

                let apiUrl;
                let endPointPath;

                if (isProduction) {
                    apiUrl = '/api/proxy';
                    const targetUrl = `http://${settings.ip}:${settings.port}/${endPoint}`;
                    endPointPath = `?targetUrl=${encodeURIComponent(targetUrl)}`;
                } else {
                    apiUrl = `http://${settings.ip}:${settings.port}`;
                    endPointPath = `/${endPoint}`;
                }

                const response = await fetcherHelper<Dto>({
                    apiUrl: apiUrl,
                    endPoint: endPointPath,
                    method: FetchMethodsEnum.GET
                });

                setResponseState({
                    ...response,
                    data: response.data && mapper(response.data)
                });
            }
        };

        const refetchLoop = () => {
            fetchData().catch((error) => console.error(error));
            setTimeout(refetchLoop, settings.interval);
        };

        refetchLoop();

        return () => {
            isMounted = false;
        };
    }, [endPoint, mapper, settings, skip]);

    return responseState;
};
