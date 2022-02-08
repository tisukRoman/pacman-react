import styled from 'styled-components';

const FloorWrapper = styled.div`
  --size: 50;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
`;

const Food = styled.div`
  --size: 15;
  background-color: #ff0;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
  border-radius: 50%;
  margin: 40% auto;
`;

const PowerFood = styled.div`
  --size: 30;
  background-color: #ff0;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
  border-radius: 50%;
  margin: 20% auto;
`;

type FloorProps = {
  hasFood?: boolean;
  hasPowerFood?: boolean;
};

const Floor: React.FC<FloorProps> = ({ hasFood, hasPowerFood}) => {
  return (
    <FloorWrapper>
      {hasFood && <Food></Food>}
      {hasPowerFood && <PowerFood></PowerFood>}
    </FloorWrapper>
  );
};

export default Floor;
