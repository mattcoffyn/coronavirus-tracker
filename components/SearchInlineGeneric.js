import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import { useRouter } from 'next/router';
import { gql, useLazyQuery } from '@apollo/client';
import Link from 'next/link';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/InlineDropdown';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY(
    $searchTerm: String!
    $searchTerm1: String!
    $searchTerm2: String
  ) {
    allCustomers(
      where: {
        OR: [
          { firstName_contains_i: $searchTerm }
          { lastName_contains_i: $searchTerm }
          {
            AND: [
              { firstName_contains_i: $searchTerm1 }
              { lastName_contains_i: $searchTerm2 }
            ]
          }
        ]
      }
    ) {
      id
      firstName
      lastName
      businessName
      emailAddress
      billingName
      billingBusiness
      billingFirstLine
      billingSecondLine
      billingThirdLine
      billingCity
      billingPostCode
      shippingName
      shippingBusiness
      shippingFirstLine
      shippingSecondLine
      shippingThirdLine
      shippingCity
      shippingPostCode
      salesOrders {
        id
        orderNumber
        totalPrice
      }
      memo
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
    allProductCategories(where: { name_contains_i: $searchTerm }) {
      id
      name
    }
  }
`;

function AutoComplete({ searchFor, handleChange, placeholder, ...props }) {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_ITEMS_QUERY,
    { fetchPolicy: 'no-cache' }
  );
  const customers = data ? data.allCustomers : [];
  const products = data ? data.allProducts : [];
  const assemblyItems = data ? data.allAssemblyItems : [];
  const categories = data ? data.allProductCategories : [];

  let items = [];
  if (searchFor === 'customer') {
    items = [...customers];
  } else if (searchFor === 'product') {
    items = [...products];
  } else if (searchFor === 'assembly-item') {
    items = [...assemblyItems];
  } else if (searchFor === 'category') {
    items = [...categories];
  } else {
    items = [...customers, ...products, ...assemblyItems, ...categories];
  }

  const findItemsButChill = debounce(findItems, 350);

  function splitInputThenFind(inputString) {
    const splitString = inputString.split(' ');
    findItemsButChill({
      variables: {
        searchTerm: inputString,
        searchTerm1: splitString[0],
        searchTerm2: splitString[1],
      },
    });
  }

  resetIdCounter();

  return (
    <SearchStyles>
      <Downshift
        onChange={(item) => handleChange(item, searchFor)}
        itemToString={(item) => {
          if (item === null) {
            return ' ';
          } else if (item.name) {
            return item.name;
          } else if (item.firstName) {
            return item.firstName + ' ' + item.lastName;
          }
        }}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <input
              {...getInputProps({
                type: 'search',
                id: `search-${searchFor}`,
                className: loading ? 'loading' : '',
                placeholder: `${placeholder}`,
                onChange: (e) => {
                  e.persist();
                  if (!e.target.value) return;
                  splitInputThenFind(e.target.value);
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
                        {`${item.firstName} ${item.lastName} - ${item.businessName}`}
                      </DropDownItem>
                    );
                  } else {
                    return (
                      <DropDownItem
                        {...getItemProps({ item })}
                        key={item.id}
                        highlighted={index === highlightedIndex}
                      >
                        {item.name}
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

export default AutoComplete;
