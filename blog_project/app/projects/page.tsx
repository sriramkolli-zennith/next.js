
import * as React from "react";
import ProjectList from "@/components/project-list";
import ProjectListLoading from "@/components/project-list-loading";
import { ErrorBoundary } from "react-error-boundary";
import H1 from "@/components/h1";

export const metadata = {
  title: 'Projects'
};

const ProjectsPage = async (): Promise<React.ReactElement> => {
  return (
    <div>
      <H1>Projects</H1>
      <div className="mb-8">Hello, this is the list of my repos!</div>
      <ErrorBoundary fallback={<div>Cannnot fetch projects currently</div>}>
        <React.Suspense fallback={<ProjectListLoading />}>
          <ProjectList />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ProjectsPage;