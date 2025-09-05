import React, { useEffect, useState } from "react";
import project from "../types/project";
import "../styles/project_tab.css";
import { alligator, big, useAsciiText } from "react-ascii-text";

function Project_Tab({ projects }: { projects: project[] }) {
  //   const [projects, setProjects] = useState<project[]>([]);

  const asciiTextRef = useAsciiText({
    font: big,
    text: "Projects",
    isAnimated: false,
  });

  return (
    <div className="projects">
      <div className="projects__title">
        <pre ref={asciiTextRef}></pre>
      </div>
      <div className="projects__content">
        {projects.map((project) => (
          <div className="content__project">
            <div className="project__break">
              **********************************************
            </div>
            <div className="project__title">
              {project.time}: {project.title}
            </div>
            {(project.link || project.demo) && (
              <div className="project__linkline">---------</div>
            )}
            {project.link && (
              <div className="project__source">
                *{" "}
                <a href={project.link} target="_blank">
                  Source
                </a>
              </div>
            )}
            {project.demo && (
              <div className="project__demo">
                *{" "}
                <a href={project.demo} target="_blank">
                  Demo
                </a>
              </div>
            )}
            {(project.link || project.demo) && (
              <div className="project__linkline">---------</div>
            )}
            <div className="project__body">{project.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project_Tab;
