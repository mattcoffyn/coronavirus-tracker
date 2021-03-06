import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import { useRouter } from 'next/router';
import { gql, useLazyQuery } from '@apollo/client';
import Link from 'next/link';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/Dropdown';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    allCustomers(
      where: {
        OR: [
          { firstName_contains_i: $searchTerm }
          { lastName_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      firstName
      lastName
    }
    allProducts(where: { name_contains_i: $searchTerm }) {
      id
      name
      process {
        name
      }
    }
    allAssemblyItems(where: { name_contains_i: $searchTerm }) {
      id
      name
    }
  }
`;

function Search() {
  const router = useRouter();
  const [findItems, { loading, data }] = useLazyQuery(SEARCH_ITEMS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  const customers = data ? data.allCustomers : [];
  const products = data ? data.allProducts : [];
  const assemblyItems = data ? data.allAssemblyItems : [];
  const items = [...customers, ...products, ...assemblyItems];

  const findItemsButChill = debounce(findItems, 350);

  resetIdCounter();

  const findRoute = (item) => {
    if (item.firstName) {
      return `/customers/${item.id}`;
    } else if (item.process) {
      return `/products/${item.id}`;
    } else {
      return `/assembly-items/${item.id}`;
    }
  };

  return (
    <SearchStyles>
      <Downshift
        onChange={(item) =>
          router.push({
            pathname: findRoute(item),
          })
        }
        itemToString={(item) => (item === null ? '' : item.name)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          // inputValue,
          highlightedIndex,
        }) => (
          <div>
            <input
              {...getInputProps({
                type: 'search',
                placeholder: 'Search...',
                id: 'search',
                className: loading ? 'loading' : '',
                onChange: (e) => {
                  e.persist();
                  if (!e.target.value) return;
                  findItemsButChill({
                    variables: { searchTerm: e.target.value },
                  });
                },
              })}
            />

            {isOpen && (
              <DropDown>
                {items.map((item, index) => {
                  if (item.firstName) {
                    return (
                      <DropDownItem
                        {...getItemProps({ item })}
                        key={item.id}
                        highlighted={index === highlightedIndex}
                      >
                        <Link href={`/customers/${item.id}`}>
                          <a>
                            <span style={{ color: 'var(--seafoam)' }}>
                              Customer:{' '}
                            </span>
                            {item.firstName} {item.lastName}
                          </a>
                        </Link>
                      </DropDownItem>
                    );
                  } else if (item.process) {
                    return (
                      <DropDownItem
                        {...getItemProps({ item })}
                        key={item.id}
                        highlighted={index === highlightedIndex}
                      >
                        <Link href={`/products/${item.id}`}>
                          <a>
                            <span style={{ color: 'var(--seafoam)' }}>
                              Product:{' '}
                            </span>
                            {item.name}
                            <span
                              style={{
                                color: 'var(--orange)',
                                fontSize: '0.9em',
                              }}
                            >
                              {' - '}
                              {item.process.name}{' '}
                            </span>
                          </a>
                        </Link>
                      </DropDownItem>
                    );
                  } else {
                    return (
                      <DropDownItem
                        {...getItemProps({ item })}
                        key={item.id}
                        highlighted={index === highlightedIndex}
                      >
                        <Link href={`/assembly-items/${item.id}`}>
                          <a>
                            <span style={{ color: 'var(--seafoam)' }}>
                              Assembly Item:{' '}
                            </span>
                            {item.name}
                          </a>
                        </Link>
                      </DropDownItem>
                    );
                  }
                })}

                {!items.length && loading && (
                  <DropDownItem> Searching... </DropDownItem>
                )}
                {!items.length && !loading && (
                  <DropDownItem> No results found </DropDownItem>
                )}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    </SearchStyles>
  );
}

export default Search;
