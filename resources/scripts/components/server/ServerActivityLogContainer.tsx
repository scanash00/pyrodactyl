import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FlashMessageRender from '@/components/FlashMessageRender';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import Spinner from '@/components/elements/Spinner';
import ActivityLogEntry from '@/components/elements/activity/ActivityLogEntry';
import { styles as btnStyles } from '@/components/elements/button/index';
import PaginationFooter from '@/components/elements/table/PaginationFooter';
import { Input } from '@/components/elements/TextInput';
import { Calendar } from '@/components/elements/Calendar';

import { ActivityLogFilters } from '@/api/account/activity';
import { useActivityLogs } from '@/api/server/activity';

import { useFlashKey } from '@/plugins/useFlash';
import useLocationHash from '@/plugins/useLocationHash';

export default () => {
    const { hash } = useLocationHash();
    const { clearAndAddHttpError } = useFlashKey('server:activity');
    const [filters, setFilters] = useState<ActivityLogFilters>({ page: 1, sorts: { timestamp: -1 } });
    const [date, setDate] = useState<Date | undefined>(new Date());

    const { data, isValidating, error } = useActivityLogs(filters, {
        revalidateOnMount: true,
        revalidateOnFocus: false,
    });

    useEffect(() => {
        setFilters((value) => ({ ...value, filters: { ip: hash.ip, event: hash.event } }));
    }, [hash]);

    useEffect(() => {
        clearAndAddHttpError(error);
    }, [error]);

    return (
        <ServerContentBlock title={'Activity Log'}>
            <FlashMessageRender byKey={'server:activity'} />
            <div className={'grid grid-cols-4 gap-4'}>
                <div className={'col-span-1 w-full bg-black'}>
                    {(filters.filters?.event || filters.filters?.ip) && (
                        <div className={'flex justify-end mb-2'}>
                            <Link
                                to={'#'}
                                className={clsx(btnStyles.button, btnStyles.text, 'w-full sm:w-auto')}
                                onClick={() => setFilters((value) => ({ ...value, filters: {} }))}
                            >
                                Clear Filters
                                {/* FIXME: X icon */}
                            </Link>
                        </div>
                    )}

                    <Input
                        className='p-2'
                        name={'Search'}
                        placeholder={'Search'}
                        onChange={(e) => setFilters((value) => ({ ...value, filters: { ...value.filters, event: e.target.value } }))}
                    />

                    <div className={'mt-4'}>
                        <h1 className={'text-xs text-zinc-500 uppercase'}>User</h1>
                        <Input
                            className='p-2'
                            name={'User'}
                            placeholder={'User'}
                            onChange={(e) => setFilters((value) => ({ ...value, filters: { ...value.filters, user: e.target.value } }))}
                        />

                        <h1 className={'text-xs text-zinc-500 uppercase mt-4'}>IP</h1>
                        <Input
                            className='p-2'
                            name={'IP'}
                            placeholder={'IP'}
                            onChange={(e) => setFilters((value) => ({ ...value, filters: { ...value.filters, ip: e.target.value } }))}
                        />

                        <h1 className={'text-xs text-zinc-500 uppercase mt-4'}>Time</h1>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
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
