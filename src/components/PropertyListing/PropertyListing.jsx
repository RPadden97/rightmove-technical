import React, { useEffect, useState } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const DUMMY_PROPERTY = {
    id: 73864112,
    bedrooms: 3,
    summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
    displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
    propertyType: 'Flat',
    price: 1950000,
    branchName: 'M2 Property, London',
    propertyUrl: '/property-for-sale/property-73864112.html',
    contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
    propertyTitle: '3 bedroom flat for sale',
    mainImage:
        'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg',
};

/* 
 * useProperties: hook for fetching property list from api
 *  
 * TODO(rpadden97):
 * * Implement query parameter for filtering
 * * Setup Loading state
 * * Setup Error state
*/
const useProperties = () => {
    const [propertyList, setPropertyList] = useState(Array(0))
    const url = 'http://localhost:3000/api/properties'

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(url)

                if (!response.ok) {
                  throw new Error(`Error status: ${response.status}`)
                }
            
                const properties = await response.json()

                setPropertyList(properties)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchProperties()
    }, [url])

    return propertyList
}

/* 
 * PropertyListing: renders list of properties
 *  
 * @component
 * 
 * TODO(rpadden97):
 * * Add parameter for number of cards to be shown
 * * Setup Loading screen -> Revist guard rail statement
 * * Setup Error screen
*/
const PropertyListing = () => {
    const properties = useProperties()

    /* Discussion: Guard rails that cause tests to fail */
    // if (properties.length == undefined || properties.length <= 0) { 
    //     return (<div><p>Loading</p></div>)
    // }

    return (
        <ul className="PropertyListing">
            {properties.slice(0,5).map((property, index) => (
                <li key={index}>
                    <PropertyCard {...property} />
                </li>
            ))}
        </ul>
    );
};

export default PropertyListing;
