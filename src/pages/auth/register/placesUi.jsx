import { Field } from 'formik';
import { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { toast } from 'react-toastify';

const PlacesUi = ({
  name,
  placeholder = '',
  type = 'text',
  displayName,
  handleAddress,
  addressValue = '',
}) => {
  const [address, setAddress] = useState(addressValue);

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const latlng = await getLatLng(results[0]);

      setAddress(value);
      handleAddress({ value, latlng });
    } catch (error) {
      toast.error('location error');
      // console.log('location error', { error });
    }
  };

  const onError = (status, clearSuggestions) => {
    toast.error('Google Maps API returned error.');
    // console.log('Google Maps API returned error with status: ', status);
    clearSuggestions();
  };

  const searchOptions = {
    componentRestrictions: { country: ['NG'] },
    // location: addressValue,
  };

  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            onError={onError}
            shouldFetchSuggestions={address.length > 3}
            searchOptions={searchOptions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => {
              return (
                <label className="block relative floated-label col-span-12 my-4  sm:my-0 sm:col-span-6">
                  <input
                    {...field}
                    type={type}
                    className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-md rounded-2xl"
                    {...getInputProps({ placeholder: placeholder })}
                  />
                  <p className="uppercase bg-white text-sm px-2">
                    {displayName}
                  </p>

                  <div className="px-2">
                    {loading && <div>Loading...</div>}
                    {suggestions.slice(0, 3)?.map((suggestion) => {
                      const className = suggestion?.active
                        ? 'text-green-500'
                        : '';
                      const style = suggestion?.active
                        ? { backgroundColor: '#fafafa py-2', cursor: 'pointer' }
                        : {
                            backgroundColor: '#ffffff py-2 ',
                            cursor: 'pointer',
                          };
                      return (
                        <div
                          key={suggestion}
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                          className="border p-1 my-3"
                        >
                          <span>{suggestion?.description}</span>
                        </div>
                      );
                    })}
                  </div>
                  {meta?.touched && meta?.error && (
                    <div className="error my-2 text-sm text-red-500">
                      {`${displayName} ${meta?.error}`}
                    </div>
                  )}
                </label>
              );
            }}
          </PlacesAutocomplete>
        );
      }}
    </Field>
  );
};

export default PlacesUi;
