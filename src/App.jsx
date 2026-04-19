import { useEffect, useMemo, useState } from 'react';
import ControlPanel from './components/ControlPanel';
import MeshGrid from './components/MeshGrid';
import ComplexityPanel from './components/ComplexityPanel';
import { getStepMetrics, runMeshShift, validateInputs } from './utils/shiftLogic';

const STAGE_INITIAL = 0;
const STAGE_ROW = 1;
const STAGE_COLUMN = 2;

function parseInteger(rawValue) {
  if (rawValue.trim() === '') {
    return NaN;
  }

  return Number(rawValue);
}

export default function App() {
  const [pValue, setPValue] = useState('16');
  const [qValue, setQValue] = useState('5');
  const [simulationInput, setSimulationInput] = useState({ p: 16, q: 5 });
  const [stage, setStage] = useState(STAGE_INITIAL);
  const [isPlaying, setIsPlaying] = useState(false);

  const pNumber = parseInteger(pValue);
  const qNumber = parseInteger(qValue);
  const validation = validateInputs(pNumber, qNumber);

  const liveMetrics = useMemo(() => {
    if (!validation.valid) {
      return {
        rowShiftAmount: 0,
        columnShiftAmount: 0,
        meshSteps: 0,
        ringSteps: 0
      };
    }

    return getStepMetrics(pNumber, qNumber);
  }, [pNumber, qNumber, validation.valid]);

  const simulation = useMemo(
    () => runMeshShift(simulationInput.p, simulationInput.q),
    [simulationInput.p, simulationInput.q]
  );

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    setStage(STAGE_ROW);

    const toColumn = setTimeout(() => setStage(STAGE_COLUMN), 1200);
    const toStop = setTimeout(() => setIsPlaying(false), 2400);

    return () => {
      clearTimeout(toColumn);
      clearTimeout(toStop);
    };
  }, [isPlaying]);

  const currentData = stage === STAGE_INITIAL
    ? simulation.initial
    : stage === STAGE_ROW
      ? simulation.afterRowShift
      : simulation.final;

  const currentStageName = stage === STAGE_INITIAL ? 'none' : stage === STAGE_ROW ? 'row' : 'column';

  const currentShiftAmount = stage === STAGE_INITIAL
    ? 0
    : stage === STAGE_ROW
      ? simulation.rowShiftAmount
      : simulation.columnShiftAmount;

  function handleRunSimulation() {
    if (!validation.valid) {
      return;
    }

    setSimulationInput({ p: pNumber, q: qNumber });
    setStage(STAGE_INITIAL);
    setIsPlaying(false);
  }

  function handleNextStage() {
    setIsPlaying(false);
    setStage((prev) => (prev + 1) % 3);
  }

  function handlePlayStages() {
    setIsPlaying(true);
  }

  function handleReset() {
    setIsPlaying(false);
    setStage(STAGE_INITIAL);
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Parallel Computing Visual Lab</p>
        <h1>Mesh Circular q-Shift Visualizer</h1>
        <p>
          Simulate node-to-node communication where each node i sends data to node (i + q) mod p
          using a two-stage mesh strategy.
        </p>
      </header>

      <section className="layout-top">
        <ControlPanel
          pValue={pValue}
          qValue={qValue}
          onPChange={setPValue}
          onQChange={setQValue}
          onRun={handleRunSimulation}
          errors={validation.errors}
        />
        <ComplexityPanel metrics={liveMetrics} />
      </section>

      <section className="panel playback-panel">
        <h2>Step-by-Step Animation</h2>
        <p>
          Current stage:{' '}
          <strong>
            {stage === STAGE_INITIAL ? 'Before Shift' : stage === STAGE_ROW ? 'Stage 1 - Row Shift' : 'Stage 2 - Column Shift'}
          </strong>
        </p>
        <div className="button-row">
          <button type="button" onClick={handlePlayStages} disabled={isPlaying}>
            Play Stage 1 + Stage 2
          </button>
          <button type="button" onClick={handleNextStage}>Next Stage</button>
          <button type="button" onClick={handleReset}>Reset to Before</button>
        </div>
      </section>

      <MeshGrid
        title="Active Mesh"
        data={currentData}
        meshSize={simulation.meshSize}
        stage={currentStageName}
        shiftAmount={currentShiftAmount}
      />

      <section className="state-grid">
        <MeshGrid
          title="Before Shift"
          data={simulation.initial}
          meshSize={simulation.meshSize}
          stage="none"
          shiftAmount={0}
          compact
        />
        <MeshGrid
          title="After Stage 1 (Row Shift)"
          data={simulation.afterRowShift}
          meshSize={simulation.meshSize}
          stage="row"
          shiftAmount={simulation.rowShiftAmount}
          compact
        />
        <MeshGrid
          title="After Stage 2 (Final)"
          data={simulation.final}
          meshSize={simulation.meshSize}
          stage="column"
          shiftAmount={simulation.columnShiftAmount}
          compact
        />
      </section>
    </main>
  );
}
