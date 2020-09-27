import React, { useEffect, createRef, useState } from 'react';
import { Div, DivProps } from '@atoms/basics';

interface InfiniteScrollHookProps {
  next?(): Promise<void>;
  hasMore?: boolean;
}

function useInfiniteScroll({
  next = async () => {},
  hasMore = false,
}: InfiniteScrollHookProps) {
  const scrollTarget = createRef<HTMLDivElement>();
  const [isLoading, setLoading] = useState(false);
  const target = scrollTarget.current;

  useEffect(() => {
    function onScroll() {
      if (target) {
        const { scrollTop, clientHeight, scrollHeight } = target;
        if (scrollTop + clientHeight >= scrollHeight && hasMore) {
          setLoading(true);
          next().finally(() => {
            setLoading(false);
          });
        }
      }
    }

    if (target) {
      target.addEventListener('scroll', onScroll);
      target.addEventListener('load', onScroll);
    }

    return () => {
      if (target) {
        target.removeEventListener('scroll', onScroll);
        target.removeEventListener('load', onScroll);
      }
    };
  }, [target, hasMore]);

  return { scrollTarget, isLoading };
}

interface InfiniteScrollProps extends InfiniteScrollHookProps, DivProps {
  loader?: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  next,
  hasMore,
  loader = 'Loading...',
  children,
  ...props
}) => {
  const { scrollTarget, isLoading } = useInfiniteScroll({ next, hasMore });

  return (
    <Div ref={scrollTarget} customScrollbar maxH='600px' {...props}>
      {children}
      {isLoading && (
        <Div w='100%' fAlign='center' p='8px'>
          {loader}
        </Div>
      )}
    </Div>
  );
};

export default InfiniteScroll;
