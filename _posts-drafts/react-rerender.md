---
title: "React Re-renders and the Mystery of the Disappearing Pop-ups"
excerpt: "Some important React lessons."
coverImage: "/assets/blog/preview/cover.jpg"
date: "2022-12-04T00:00:00.000Z"
author:
  name: Adrian Hong
  picture: "/assets/blog/authors/joe.jpeg"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
tags: ["Javascript"]
---

> TLDR
>
> 1. Don't create components in the render function
> 2. All components that use Context will re-render when the Context Provider changes

Today I present React Re-renders and the Mystery of the Disappearing Pop-ups. Time to channel my inner J.K. Rowling 😤

I was creating a list where items can be deleted. When deleted, we are notified of that deletion through an informative toast. Strangely, when the toast closed, it was also removing any delete confirmation dialogs that were open. This was a head scratcher, how does a toast change the state of an entirely different component?

Let’s look at a dumbed down version of the feature I cooked up earlier.

## ToastProvider

Let’s delve deeper into the `ToastProvider`. `ToastProvider` holds a callback function `raiseToast` which can be executed in another component to show the toast for a given duration.

```js

const [toastProps, setToastProps] = useState<RaiseToastArgs>();

const raiseToast = useCallback((args: RaiseToastArgs) => {
    const mergedProps = { ...defaultArgs, ...args };
    setToastProps(mergedProps);
  }, []);

  useEffect(() => {
    if (toastProps?.duration) {
      const timer = setTimeout(() => {
        setToastProps(undefined);
      }, toastProps.duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toastProps]);

```

toastProps changes so we need to update to not show the Toast using a rerender. Rerender of toastprovider will rerender items. Items will be instantiated again.
