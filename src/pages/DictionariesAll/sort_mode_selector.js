import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, Container, Form, Radio, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import { downloadDictionariesMutation } from "backend";
// eslint-disable-next-line import/no-unresolved
import config from "config";
import { useMutation, useTranslations } from "hooks";

import "./styles.scss";

const SortModeSelector = ({ sortMode, onChange, selected, setSelected }) => {
  const { getTranslation } = useTranslations();

  const [searchParams, setSearchParams] = useSearchParams();

  const user = useSelector(state => state.user.user);

  const [downloadDictionaries] = useMutation(downloadDictionariesMutation, { onCompleted: () => setSelected([]) });

  return (
    <div className="background-header">
      <Container textAlign="center">
        <Form>
          <Segment className="lingvo-group-radios">
            <Form.Group inline>
              <Form.Field
                className="lingvo-group-radios__item"
                control={Radio}
                label={getTranslation("By Languages")}
                value="1"
                checked={sortMode === "language"}
                onChange={() => {
                  onChange();
                  searchParams.delete("language");
                  searchParams.delete("grant");
                  searchParams.delete("organization");
                  setSearchParams(searchParams);
                  if (selected.length !== 0) {
                    setSelected([]);
                  }
                }}
              />
              <Form.Field
                className="lingvo-group-radios__item"
                control={Radio}
                label={getTranslation("By Grants")}
                value="2"
                checked={sortMode === "grant"}
                onChange={() => {
                  onChange();
                  searchParams.delete("language");
                  searchParams.delete("organization");
                  searchParams.set("grant", "");
                  setSearchParams(searchParams);
                  if (selected.length !== 0) {
                    setSelected([]);
                  }
                }}
              />
              <Form.Field
                className="lingvo-group-radios__item"
                control={Radio}
                label={getTranslation("By Organizations")}
                value="3"
                checked={sortMode === "organization"}
                onChange={() => {
                  onChange();
                  searchParams.delete("language");
                  searchParams.delete("grant");
                  searchParams.set("organization", "");
                  setSearchParams(searchParams);
                  if (selected.length !== 0) {
                    setSelected([]);
                  }
                }}
              />
            </Form.Group>
          </Segment>
        </Form>

        {user.id !== undefined && (config.buildType === "desktop" || config.buildType === "proxy") && (
          <Button
            positive
            disabled={selected.size === 0}
            onClick={() => downloadDictionaries({ variables: { ids: selected } })}
          >
            {selected.size > 0 && <p>Download ({selected.size})</p>}
            {selected.size === 0 && <p>Download</p>}
          </Button>
        )}
      </Container>
    </div>
  );
};

SortModeSelector.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired
};

export default SortModeSelector;
