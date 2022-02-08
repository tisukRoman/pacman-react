import styled from 'styled-components';

const FloorWrapper = styled.div`
  --size: 50;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
`;

const Floor = () => {
  return <FloorWrapper></FloorWrapper>;
};

export default Floor;
