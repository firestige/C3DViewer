import React, { RefObject, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  ArcRotateCamera,
  Engine,
  FreeCamera,
  HemisphericLight,
  Mesh,
  PointLight,
  Scene,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";

const useBabylon = (refObj: RefObject<HTMLCanvasElement>) => {
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    let _engine = Engine.LastCreatedEngine;
    if (!_engine) {
      _engine = new Engine(refObj.current, true);
    }
    setEngine(_engine);
  }, []);

  useEffect(() => {
    const createScene = () => {
      const scene = new Scene(engine);
      const camera = new ArcRotateCamera(
        "camera1",
        0,
        0,
        10,
        new Vector3(0, 0, 0),
        scene
      );
      //camera.setTarget(Vector3.Zero());
      camera.setPosition(new Vector3(0, 0, 20));
      camera.attachControl(refObj.current, false);
      const light1 = new HemisphericLight(
        "light1",
        new Vector3(1, 1, 1),
        scene
      );
      light1.intensity = 0.7;
      const light2 = new PointLight("pl1", new Vector3(-1, -1, -1), scene);
      light2.intensity = 0.5;
      //const sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);
      //sphere.position.y = 1;
      const box = Mesh.CreateBox("box1", 10, scene);
      box.position = Vector3.Zero();
      return scene;
    };

    if (engine) {
      const scene = createScene();
      engine.runRenderLoop(() => scene.render());
    }
  }, [engine]);

  useEffect(() => {
    return () => {
      engine.dispose();
    };
  }, []);

  return engine;
};

const App: React.FC = (props) => {
  const refObj = useRef<HTMLCanvasElement>(null);
  useBabylon(refObj);
  return <canvas ref={refObj} style={{ height: "90vh", width: "90vw" }} />;
};

ReactDOM.render(<App />, document.getElementById("app"));
