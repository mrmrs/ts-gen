import React, { useState } from 'react';
import './App.css';

function getRandomDisplayP3Color() {
  // Random values for each color channel between 0 and 1
  const r = Math.random();
  const g = Math.random();
  const b = Math.random();

  return `color(display-p3 ${r} ${g} ${b})`;
}


function getRandomAngle() {
  return Math.floor(Math.random() * 361);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCircle(color) {
  const radius = getRandomInt(10, 50);
  const x = getRandomInt(radius, 500 - radius);
  const y = getRandomInt(radius, 500 - radius);
  return <circle cx={x} cy={y} r={radius} fill={color} />;
}

function createSquare(color) {
  const size = getRandomInt(10, 50);
  const x = getRandomInt(0, 500 - size);
  const y = getRandomInt(0, 500 - size);
  return <rect x={x} y={y} width={size} height={size} fill={color} />;
}

function createTriangle(color) {
  const size = getRandomInt(10, 50);
  const x = getRandomInt(0, 500 - size);
  const y = getRandomInt(0, 500 - size);
  const points = `${x},${y} ${x + size},${y} ${x + size / 2},${y - size}`;
  return <polygon points={points} fill={color} />;
}

function createSquiggle(color) {
  const x1 = getRandomInt(0, 500);
  const y1 = getRandomInt(0, 500);
  const x2 = getRandomInt(0, 500);
  const y2 = getRandomInt(0, 500);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />;
}

function App() {
     const [angle, setAngle] = useState(getRandomInt(180,240));


 const [shapes, setShapes] = useState([]);
  const [uniformColor, setUniformColor] = useState(false); // Toggle state for uniform color

  const generateShapes = () => {
    const newShapes = [];
    const shapeCreators = [createCircle, createSquare, createTriangle, createSquiggle];

    shapeCreators.forEach(shapeCreator => {
      const color = uniformColor ? getRandomDisplayP3Color() : null;

      const numberOfShapes = getRandomInt(1, 25); // Generate 5 to 15 shapes of each type
      for (let i = 0; i < numberOfShapes; i++) {
        newShapes.push(shapeCreator(uniformColor ? color : getRandomDisplayP3Color()));
      }
    });

    setShapes(newShapes);
  };


     const setNewAngle = () => {
        setAngle(getRandomInt(0,40));
        generateShapes()
      };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  minHeight: '100dvh', backgroundColor: 'hsl('+angle+'deg 100% 50%)'  }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
         <svg width="500" height="500" style={{ border: '1px solid black', display: 'block',  }}>
            {shapes}
          </svg>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '8px',  }}>
         <button onClick={setNewAngle} style={{ appearance: 'none', WebkitAppearance: 'none', padding: '12px', background: 'black', color: 'white', border: 0, borderRadius: '6px' }}>Generate New Angle</button>
           <label style={{ fontSize: '12px'}}>
        <input
          type="checkbox"
          checked={uniformColor}
          onChange={() => setUniformColor(!uniformColor)}
        />
        Uniform Color
      </label>
     </div>
         </div>
    </div>
  );
}

export default App
