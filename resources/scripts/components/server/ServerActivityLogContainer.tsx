import { useEffect, useState } from 'react';

import FlashMessageRender from '@/components/FlashMessageRender';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import Spinner from '@/components/elements/Spinner';
import ActivityLogEntry from '@/components/elements/activity/ActivityLogEntry';
import PaginationFooter from '@/components/elements/table/PaginationFooter';
import { Input } from '@/components/elements/TextInput';
import { Calendar } from '@/components/elements/Calendar';
import Button from '@/components/elements/ButtonV2';
import HugeIconsX from '@/components/elements/hugeicons/X';

import { ActivityLogFilters } from '@/api/account/activity';
import { useActivityLogs } from '@/api/server/activity';

import { useFlashKey } from '@/plugins/useFlash';
import useLocationHash from '@/plugins/useLocationHash';

const ServerActivityLogContainer = () => {
    const { hash } = useLocationHash();
    const { clearAndAddHttpError } = useFlashKey('server:activity');
    const [filters, setFilters] = useState<ActivityLogFilters>({ page: 1, sorts: { timestamp: -1 }, filters: { date: new Date() } });
    const [searchFilters, setSearchFilters] = useState<{ key: 'event' | 'ip', value: string }[]>([]);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [search, setSearch] = useState<string>('');

    const handleSearchChange = () => {
        const value = search;
        if (value) {
            const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(value);
            const filterKey = isIP ? 'ip' : 'event';

            if (!searchFilters.some(filter => filter.key === filterKey)) {
                setSearchFilters([...searchFilters, { key: filterKey, value }]);
                setFilters((prev) => ({ ...prev, filters: { ...prev.filters, [filterKey]: value } }));
            }
        }
    };

    const handleRemoveFilter = (key: 'event' | 'ip') => {
        setSearchFilters((prev) => prev.filter(filter => filter.key !== key));
        setFilters((prev) => {
            const newFilters = { ...prev.filters };
            delete newFilters[key];
            return { ...prev, filters: newFilters };
        });
    };

    const handleClearFilters = () => {
        setSearchFilters([]);
        setFilters((prev) => ({ ...prev, filters: { date } }));
    };

    const { data, isValidating, error, mutate } = useActivityLogs(filters, {
        revalidateOnMount: true,
        revalidateOnFocus: false,
    });

    useEffect(() => {
        setFilters((value) => ({ ...value, filters: { ...value.filters, date } }));
        mutate();
    }, [date]);

    useEffect(() => {
        clearAndAddHttpError(error);
    }, [error]);

    return (
        <ServerContentBlock title={'Activity Log'}>
            <FlashMessageRender byKey={'server:activity'} />
            <div className={'grid grid-cols-4 gap-4'}>
                <div className={'col-span-1 w-full h-fit bg-[#ffffff08] p-4 rounded-md'}>
                    <div className={'flex flex-col h-full justify-between'}>
                        <div className={'flex flex-col gap-4'}>
                            <Input
                                className='p-2'
                                name={'Search'}
                                placeholder={'Search'}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        handleSearchChange()
                                    }
                                  }}
                            />
                            <div className={'flex flex-row gap-2'}>
                                {searchFilters.map((filter) => (
                                    <div key={filter.key} className={'h-8 flex items-center gap-2 bg-gradient-to-b from-[#ffffff10] to-[#ffffff09] inner-border-[1px] inner-border-[#ffffff08] border border-transparent rounded-full p-2'}>
                                        <span>{filter.value}</span>
                                        <button
                                            onClick={() => handleRemoveFilter(filter.key)}
                                            className={'text-neutral-400 hover:text-brand'}
                                        >
                                            <HugeIconsX fill={'currentColor'} className='p-[4px]' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={'flex justify-center'}>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </div>
                    </div>
                </div>
                <div className={'col-span-3'}>
                    {data && (
                        <PaginationFooter
                            pagination={data.pagination}
                            onPageSelect={(page) => setFilters((value) => ({ ...value, page }))}
                        />
                    )}
                    {!data && isValidating ? (
                        <Spinner centered />
                    ) : !data?.items.length ? (
                        <p className={'text-sm text-center text-zinc-400'}>No activity logs available for this server.</p>
                    ) : (
                        <div>
                            {data?.items.map((activity) => (
                                <ActivityLogEntry key={activity.id} activity={activity}>
                                    <span />
                                </ActivityLogEntry>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ServerContentBlock>
    );
};

export default ServerActivityLogContainer;
