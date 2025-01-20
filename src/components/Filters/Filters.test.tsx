import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';

describe('Filters Component', () => {
  test('renders the select and input elements', () => {
    render(
      <Filters
        filterStatus="all"
        setFilterStatus={jest.fn()}
        searchText=""
        setSearchText={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Buscar tarefa...')).toBeInTheDocument();
    expect(screen.getByText('Todas')).toBeInTheDocument();
  });

  test('calls setFilterStatus when a new option is selected', () => {
    const setFilterStatusMock = jest.fn();

    render(
      <Filters
        filterStatus="all"
        setFilterStatus={setFilterStatusMock}
        searchText=""
        setSearchText={jest.fn()}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'completed' } });

    expect(setFilterStatusMock).toHaveBeenCalledWith('completed');
  });

  test('calls setSearchText when typing in the input', () => {
    const setSearchTextMock = jest.fn();

    render(
      <Filters
        filterStatus="all"
        setFilterStatus={jest.fn()}
        searchText=""
        setSearchText={setSearchTextMock}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Buscar tarefa...'), { target: { value: 'Nova tarefa' } });

    expect(setSearchTextMock).toHaveBeenCalledWith('Nova tarefa');
  });
});