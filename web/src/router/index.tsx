import { createBrowserRouter, redirect } from "react-router-dom";
import { lazy } from "react";
import { isNullorUndefined } from "@/helpers/utils";
import store from "@/store";
import { initialGlobalState, initialUserState } from "@/store/module";
import DailyReview from "@/pages/DailyReview";
import ResourcesDashboard from "@/pages/ResourcesDashboard";

const Root = lazy(() => import("@/layouts/Root"));
const Auth = lazy(() => import("@/pages/Auth"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const Explore = lazy(() => import("@/pages/Explore"));
const Home = lazy(() => import("@/pages/Home"));
const MemoDetail = lazy(() => import("@/pages/MemoDetail"));
const EmbedMemo = lazy(() => import("@/pages/EmbedMemo"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const initialGlobalStateLoader = (() => {
  let done = false;

  return async () => {
    if (done) {
      return;
    }
    done = true;
    try {
      await initialGlobalState();
    } catch (error) {
      // do nth
    }
  };
})();

const router = createBrowserRouter([
  {
    path: "/memos/auth",
    element: <Auth />,
    loader: async () => {
      await initialGlobalStateLoader();
      return null;
    },
  },
  {
    path: "/memos/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/memos/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: async () => {
          await initialGlobalStateLoader();

          try {
            await initialUserState();
          } catch (error) {
            // do nth
          }

          const { host, user } = store.getState().user;
          if (isNullorUndefined(host)) {
            return redirect("/memos/auth");
          } else if (isNullorUndefined(user)) {
            return redirect("/explore");
          }
          return null;
        },
      },
      {
        path: "/memos/u/:userId",
        element: <Home />,
        loader: async () => {
          await initialGlobalStateLoader();

          try {
            await initialUserState();
          } catch (error) {
            // do nth
          }

          const { host } = store.getState().user;
          if (isNullorUndefined(host)) {
            return redirect("/memos/auth");
          }
          return null;
        },
      },
      {
        path: "explore",
        element: <Explore />,
        loader: async () => {
          await initialGlobalStateLoader();

          try {
            await initialUserState();
          } catch (error) {
            // do nth
          }

          const { host } = store.getState().user;
          if (isNullorUndefined(host)) {
            return redirect("/memos/auth");
          }
          return null;
        },
      },
      {
        path: "review",
        element: <DailyReview />,
        loader: async () => {
          await initialGlobalStateLoader();

          try {
            await initialUserState();
          } catch (error) {
            // do nth
          }

          const { host } = store.getState().user;
          if (isNullorUndefined(host)) {
            return redirect("/memos/auth");
          }
          return null;
        },
      },
      {
        path: "resources",
        element: <ResourcesDashboard />,
        loader: async () => {
          await initialGlobalStateLoader();

          try {
            await initialUserState();
          } catch (error) {
            // do nth
          }

          const { host } = store.getState().user;
          if (isNullorUndefined(host)) {
            return redirect("/memos/auth");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "/memos/m/:memoId",
    element: <MemoDetail />,
    loader: async () => {
      await initialGlobalStateLoader();

      try {
        await initialUserState();
      } catch (error) {
        // do nth
      }

      const { host } = store.getState().user;
      if (isNullorUndefined(host)) {
        return redirect("/memos/auth");
      }
      return null;
    },
  },
  {
    path: "/memos/m/:memoId/embed",
    element: <EmbedMemo />,
    loader: async () => {
      await initialGlobalStateLoader();

      try {
        await initialUserState();
      } catch (error) {
        // do nth
      }
      return null;
    },
  },
  {
    path: "/memos/*",
    element: <NotFound />,
    loader: async () => {
      await initialGlobalStateLoader();
      return null;
    },
  },
  {
    path: "*",
    element: <NotFound />,
    loader: async () => {
      await initialGlobalStateLoader();
      return null;
    },
  },
]);

export default router;
