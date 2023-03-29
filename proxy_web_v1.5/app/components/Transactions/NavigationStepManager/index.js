import React from 'react';
import NavigationStep from 'components/Transactions/NavigationStep';
import styled from 'styled-components';
import BackButton from '../BackButton';

export const HEIGHT_NAVIGATION_STEP = 60;

const NavigationContainer = styled.div`
  padding: 0 0;
  z-index: 1;
  height: ${HEIGHT_NAVIGATION_STEP}px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0.5px 1px 2px 0 rgba(0, 0, 0, 0.1);
  background-color: #16998f;
  position: relative;

  .status-bar {
    height: 4px;
    background-image: linear-gradient(to right, #11998e, #c4682e 49%, #df5151);
    width: ${(props) => props.completed ? 100 : ((props.currentStep * 100) / (props.totalStep + 1))}%;
    position: absolute;
    top: 100%;
  }

  .list-step {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    left: 0;
    top: ${HEIGHT_NAVIGATION_STEP - 8}px;
  }
`;

const NavigationStepManager = ({ currentStep, completed, stepList, lastSearchStepNumber, handleBack }) => {
  const totalStep = stepList ? stepList.length : 0;

  return (
    <NavigationContainer totalStep={totalStep} currentStep={currentStep} completed={completed}>
      {(currentStep !== 1 && !!handleBack && !completed) && <BackButton handleBack={handleBack} />}
      <div className="status-bar" />
      <div className="list-step">
        <div />
        {stepList.map(({ title, number }) => (
          <NavigationStep
            key={`${title}-${number}`}
            title={title}
            completed={completed}
            number={number}
            currentStep={currentStep}
            lastSearchStepNumber={lastSearchStepNumber}
          />
        ))}
        <div />
      </div>
    </NavigationContainer>
  );
};

export default NavigationStepManager;
