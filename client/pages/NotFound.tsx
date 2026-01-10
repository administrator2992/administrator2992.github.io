import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold leading-[110%] tracking-[-1.6px] text-black">
            404
          </h1>
          <p className="mb-6 text-xl leading-[145%] tracking-[-0.1px] text-black/55">
            Oops! Page not found
          </p>
          <Link 
            to="/" 
            className="text-lg font-medium leading-[145%] tracking-[-0.09px] text-black hover:underline"
          >
            Return to Home →
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
