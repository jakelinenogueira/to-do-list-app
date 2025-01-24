import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input'; // Certifique-se de que o caminho está correto

describe('Componente input', () => {
  test('renderiza entrada e botão e chama onAddTask quando uma tarefa é adicionada', async () => {
    const onAddTaskMock = jest.fn(); // Mock da função onAddTask
    render(<Input onAddTask={onAddTaskMock} />);

    const inputElement = screen.getByPlaceholderText('Adicionar uma nova tarefa');
    const buttonElement = screen.getByText('Adicionar');

    // Verifica se os elementos renderizaram corretamente
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();

    // Simula digitar um texto no input
    await userEvent.type(inputElement, 'Nova Tarefa');
    expect(inputElement).toHaveValue('Nova Tarefa'); // Confirma o valor digitado

    // Simula clique no botão para adicionar a tarefa
    await userEvent.click(buttonElement);

    // Verifica se a função mock foi chamada com o texto correto
    expect(onAddTaskMock).toHaveBeenCalledTimes(1);
    expect(onAddTaskMock).toHaveBeenCalledWith('Nova Tarefa');
    expect(inputElement).toHaveValue(''); // Verifica se o input foi limpo após adicionar a tarefa
  });

  test('chama onAddTask ao pressionar Enter', async () => {
    const onAddTaskMock = jest.fn(); // Mock da função onAddTask
    render(<Input onAddTask={onAddTaskMock} />);

    const inputElement = screen.getByPlaceholderText('Adicionar uma nova tarefa');

    // Simula digitar um texto no input
    await userEvent.type(inputElement, 'Tarefa com Enter');
    expect(inputElement).toHaveValue('Tarefa com Enter');

    // Simula pressionar Enter no input
    await userEvent.keyboard('{Enter}');

    // Verifica se a função mock foi chamada com o texto correto
    expect(onAddTaskMock).toHaveBeenCalledTimes(1);
    expect(onAddTaskMock).toHaveBeenCalledWith('Tarefa com Enter');
    expect(inputElement).toHaveValue(''); // Verifica se o input foi limpo após adicionar a tarefa
  });
});