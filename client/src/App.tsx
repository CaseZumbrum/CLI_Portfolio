import React, { useRef, useEffect, useState } from "react";
import { alligator, big, useAsciiText } from "react-ascii-text";
import "./App.css";
import command from "./types/command";
import Project_Tab from "./components/project_tab";
import Job_Tab from "./components/job_tab";
import project from "./types/project";
import job from "./types/job";

function App() {
  const [commands, setCommands] = useState<command[]>([]);
  const [command, setCommand] = useState<string>("");
  const [tab, setTab] = useState<string>("projects");
  const [searchIndex, setSearchIndex] = useState<number>(0);
  const scrollRef = useRef(null);
  const [projects, setProjects] = useState<project[]>([]);
  const [jobs, setJobs] = useState<job[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [cat, setCat] = useState<boolean>(false);
  const [name, setName] = useState<string>("Case\nZumbrum");
  const asciiTextRef = useAsciiText({
    font: big,
    text: name,
    fadeInOnly: true,
    animationLoop: false,
  });
  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const a: HTMLAudioElement = new Audio("/meow.mp3");
  const r: HTMLAudioElement = new Audio("/static/audio/rats.mp3");

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handle_commands = (input: string): string => {
    if (input == "clear") {
      setCommands([]);
      return "";
    } else if (input == "cat") {
      setCat(!cat);
      a.play();
      return "meow";
    } else if (input == "rats") {
      r.play();
      return `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_..----.._&nbsp;&nbsp;&nbsp;&nbsp;_<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.'&nbsp;&nbsp;.--.&nbsp;&nbsp;&nbsp;&nbsp;"-.(0)_<br>
'-.__.-'"'=:|&nbsp;&nbsp;&nbsp;,&nbsp;&nbsp;_)_&nbsp;\__&nbsp;.&nbsp;c\'-..<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'''------'---''---'-"<br>`;
    } else if (input == "vectors") {
      window.open("/project_pages/vector_fields.html", "_blank");
      return "So you think you can field?";
    } else if (input == "deep") {
      window.open("/project_pages/miner.html", "_blank");
      return "Good luck miner!";
    } else if (input == "help") {
      return "This is a command line interface for various secrets hidden on this site<br>Happy hunting!";
    }
    return "Error: Command not found";
  };

  const handle_key_press = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (tab != "console") {
      return;
    }
    if (e.key == "Enter") {
      // execute command!!!!
      setSearchIndex(0);
      setCommand("");
      setCommands((prevstate) => [
        ...prevstate,
        { input: command, output: handle_commands(command) },
      ]);
    } else if (e.key == "Backspace") {
      setCommand((prevstate) => prevstate.substring(0, prevstate.length - 1));
    } else if (e.key == "ArrowUp") {
      if (commands.length > searchIndex) {
        setSearchIndex((prevstate) => prevstate + 1);
        setCommand(commands[commands.length - searchIndex - 1].input);
      }
    } else if (e.key == "ArrowDown") {
      if (searchIndex > 0) {
        setSearchIndex((prevstate) => prevstate - 1);
        if (searchIndex == 1) {
          setCommand("");
        } else {
          setCommand(commands[commands.length - searchIndex + 1].input);
        }
      }
    } else {
      setCommand((prevstate) => prevstate + e.key);
    }
  };

  useEffect(() => {
    console.log(commands);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    console.log(command);
  }, [command]);

  useEffect(() => {
    fetch("https://casezumbrum.com" + "/work").then((response) => {
      response.json().then((jobs) => {
        console.log(jobs);
        setJobs(jobs);
      });
    });
  }, []);

  useEffect(() => {
    fetch("https://casezumbrum.com" + "/projects").then((response) => {
      response.json().then((projects) => {
        console.log(projects);
        setProjects(projects);
      });
    });
  }, []);

  return (
    <div tabIndex={0} className="app" onKeyDown={handle_key_press}>
      <div className="app-left">
        <pre key={name} className="left__ascii" ref={asciiTextRef}></pre>
        <div className="left-intro">
          <span style={{ color: "#c0a000" }}>$</span>&nbsp;cat whoami.txt
          <div className="intro-body">
            <span>- Second year Computer Engineering student at UF</span>
            <span>
              - Researcher with IoT4Ag (Internet of Things for Agriculture) at
              UF
            </span>
            <span>- Teaching Assistant for Programming 1 (COP3502C)</span>
            <span>- Creator/maintainer of GatorGuide</span>
          </div>
        </div>
        <div className="left-contacts">
          <span style={{ color: "#c0a000" }}>$</span>&nbsp;cat contacts.txt
          <div className="contacts-links">
            <a href={"https://github.com/CaseZumbrum"}>GitHub</a>
            <a href={"https://linkedin.com/in/case-zumbrum"}>LinkedIn</a>
            <a href={"casezumbrum@ufl.edu"}>Email</a>
            <a
              href={
                "https://docs.google.com/document/d/1MOTXNbck3oeZoYUyFrlqaqhfbghRPDtDoLcmGVzJUS0/edit?usp=sharing"
              }
            >
              Resume
            </a>
          </div>
        </div>
      </div>
      <div className="app-right" ref={scrollRef}>
        <div className="right__buttons">
          <button
            style={{
              color: tab == "projects" ? "black" : undefined,
              backgroundColor: tab == "projects" ? "#cccccc" : undefined,
            }}
            onClick={() => {
              setTab("projects");
            }}
          >
            Projects
          </button>
          <button
            style={{
              color: tab == "work" ? "black" : undefined,
              backgroundColor: tab == "work" ? "#cccccc" : undefined,
            }}
            onClick={() => {
              setTab("work");
            }}
          >
            Work
          </button>
          {!isMobile && (
            <button
              style={{
                color: tab == "console" ? "black" : undefined,
                backgroundColor: tab == "console" ? "#cccccc" : undefined,
              }}
              onClick={() => {
                setTab("console");
              }}
            >
              Console
            </button>
          )}
        </div>
        {tab == "projects" && <Project_Tab projects={projects}></Project_Tab>}
        {tab == "work" && <Job_Tab jobs={jobs}></Job_Tab>}
        {tab == "console" && (
          <div className="console">
            {commands.map((command, index) => (
              <div key={index} className="right-oldcommand">
                <div>
                  <span style={{ color: "#c0a000" }}>$</span>&nbsp;
                  <span>{command.input}</span>
                </div>
                <span
                  dangerouslySetInnerHTML={{ __html: command.output }}
                ></span>
              </div>
            ))}
            <div className="right-command">
              <div>
                <span style={{ color: "#c0a000" }}>$</span>&nbsp;{command}
              </div>
              <div className="blink-box">&#9608;</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
