import React, { useEffect, useState } from "react";
import job from "../types/job";
import "../styles/project_tab.css";
import { alligator, big, useAsciiText } from "react-ascii-text";

function Job_Tab({ jobs }: { jobs: job[] }) {
  //   const [jobs, setJobs] = useState<job[]>([]);

  const asciiTextRef = useAsciiText({
    font: big,
    text: "Experience",
    isAnimated: false,
  });

  return (
    <div className="jobs">
      <div className="jobs__title">
        <pre ref={asciiTextRef}></pre>
      </div>
      <div className="jobs__content">
        {jobs.map((job) => (
          <div className="content__project">
            <div className="project__break">
              **********************************************
            </div>
            <div className="project__title">
              {job.time}: {job.company}
            </div>
            <div
              className="project__body"
              dangerouslySetInnerHTML={{ __html: job.description }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Job_Tab;
