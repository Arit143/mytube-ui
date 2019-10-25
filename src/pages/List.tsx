import React from "react";
import { useQuery } from "@apollo/react-hooks";

import Grid from "@material-ui/core/Grid";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import ListDetails, { FileDetails } from "./../components/ListDetails";
import GET_FILE_LIST from "./../common/api/query";

/**
 * Create the list of files
 */
const List: React.FC = () => {
  const { data, error, loading } = useQuery(GET_FILE_LIST, {
    partialRefetch: true,
    fetchPolicy: "cache-and-network"
  });

  if (loading) {
    return <>{"Loading..."}</>;
  }

  if (data === undefined || data.files.length === 0) {
    return (
      <Grid item xs={12}>
        <SnackbarContent
          className="empty-list"
          aria-describedby="no-results-found"
          message={"No results found"}
        />
      </Grid>
    );
  }

  return (
    <>
      {error && (
        <Grid item xs={12}>
          <SnackbarContent
            className="error-occured"
            aria-describedby="client-snackbar"
            message={"Some error occured"}
          />
        </Grid>
      )}
      {data.files.map((fileDetails: FileDetails, key: number) => {
        return <ListDetails key={`listKey${key}`} {...fileDetails} />;
      })}
    </>
  );
};

export default List;
