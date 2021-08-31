// route change라는 이벤트를 발생시킵니다.
const DISPATCH_ROUTE_CHANGE = 'route-change';

export default function router(onRoute) {
  window.addEventListener(DISPATCH_ROUTE_CHANGE, e => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });

  window.addEventListener('popstate', () => {
    onRoute();
  });
}

export const push = nextUrl => {
  window.dispatchEvent(
    new CustomEvent(DISPATCH_ROUTE_CHANGE, {
      detail: {
        nextUrl,
      },
    }),
  );
};
