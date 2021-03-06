import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  right: 0;
  /* border: 1px solid var(--orange); */
  max-height: 535px;
  overflow-y: scroll;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--orange);

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background: ${(props) =>
      props.highlighted ? 'rgba(19,19,78,0.7)' : 'rgba(10, 10, 30, 0.6)'};
    backdrop-filter: blur(5px);
  }

  @supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    background: ${(props) =>
      props.highlighted ? 'rgba(19,19,78,0.9)' : 'rgba(10, 10, 30, 0.9)'};
  }

  padding: 1rem;
  transition: all 0.2s;
  ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${(props) => (props.highlighted ? '#F3B562' : 'rgba(10, 10, 30, 0.92)')};
  color: var(--offWhite);
  font-size: 1.5rem;
  img {
    margin-right: 10px;
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
    width: 500px;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    background: var(--black);
    color: var(--offWhite);
    font-size: 2rem;
    border: 1px solid var(--grey);
    &:focus {
      background: rgba(19, 19, 78, 0.5);
      color: var(--offWhite);
      &::placeholder {
      }
    }
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
