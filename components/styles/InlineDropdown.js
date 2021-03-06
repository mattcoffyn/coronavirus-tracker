import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  left: 0;
  border: 1px solid ${(props) => props.theme.orange};
  max-height: 290px;
  overflow-y: scroll;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.orange};
  background: ${(props) => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 5px solid
    ${(props) => (props.highlighted ? props.theme.lightgrey : 'white')};
  font-size: 0.8rem;
  color: black;
  cursor: pointer;
  img {
    margin-right: 5px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border-radius: 14px;
    background: var(--offWhite);
    box-shadow: inset 5px 5px 9px #c1c1c1, inset -5px -5px 9px #ffffff;
    border: none;
    font-size: 1rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
