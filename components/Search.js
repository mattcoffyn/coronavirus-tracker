import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import { useRouter } from 'next/router';
import { gql, useLazyQuery } from '@apollo/client';
import Link from 'next/link';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/Dropdown';
import { numberWithCommas } from '../lib/formatNumbers';

const GET_COUNTRY_TOTAL_CONFIRMED = gql`
  query GET_COUNTRY_TOTAL_CONFIRMED($searchTerm: String) {
    countries(count: 1000, filter: { search: $searchTerm }) {
      results {
        name
        region {
          name
        }
        subRegion {
          name
        }
        code
        latest {
          confirmed
        }
      }
    }
  }
`;

function Search({ placeholder }) {
  const router = useRouter();
  const [findItems, { loading, data }] = useLazyQuery(
    GET_COUNTRY_TOTAL_CONFIRMED,
    {
      fetchPolicy: 'cache-and-network',
    }
  );
  const items = data ? data.countries.results : [];

  const findItemsButChill = debounce(findItems, 350);

  resetIdCounter();

  const findRoute = (item) => {
    return `/countries/${item.code}`;
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
                placeholder: placeholder,
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
                  return (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <Link href={`/countries/${item.code}`}>
                        <a>
                          <span style={{ color: 'var(--seafoam)' }}>
                            {item.name}
                          </span>
                          {/* {` - ${numberWithCommas(item.latest.confirmed)}`} */}
                        </a>
                      </Link>
                    </DropDownItem>
                  );
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
