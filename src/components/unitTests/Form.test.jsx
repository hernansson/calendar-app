import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from '../calendar/CreateForm'
import { CalendarContext } from '../../context/calendarContext'

test('Field with less than 30 characters', () => {
    const contextValue = { triggerUpdate: () => {} }
    render(
        <CalendarContext.Provider value={contextValue}>
            <CreateForm day={1} />
        </CalendarContext.Provider>
    )

    const titleFIeld = screen.getByTestId('title-test')
    expect(titleFIeld).toBeInTheDocument()
    expect(titleFIeld.value).toBe('')
    userEvent.type(titleFIeld, 'Less than 30 Chars')
    expect(titleFIeld.value).toBe('Less than 30 Chars')
})
test('Limits more than 30 chars', () => {
    const contextValue = { triggerUpdate: () => {} }
    render(
        <CalendarContext.Provider value={contextValue}>
            <CreateForm day={1} />
        </CalendarContext.Provider>
    )

    const titleFIeld = screen.getByTestId('title-test')
    expect(titleFIeld).toBeInTheDocument()
    expect(titleFIeld.value).toBe('')
    userEvent.type(titleFIeld, 'This string should not be that LONG')
    expect(titleFIeld.value).toBe('This string should not be that')
})

test('time default value', () => {
    const contextValue = { triggerUpdate: () => {} }
    render(
        <CalendarContext.Provider value={contextValue}>
            <CreateForm day={1} />
        </CalendarContext.Provider>
    )

    const timeField = screen.getByTestId('time-test')
    expect(timeField.value).toBe('07:30')
})

test('time change', () => {
    const contextValue = { triggerUpdate: () => {} }
    render(
        <CalendarContext.Provider value={contextValue}>
            <CreateForm day={1} />
        </CalendarContext.Provider>
    )

    const timeField = screen.getByTestId('time-test')
    userEvent.type(timeField, '09:35')
    expect(timeField.value).toBe('09:35')
})
test('city change', () => {
    const contextValue = { triggerUpdate: () => {} }
    render(
        <CalendarContext.Provider value={contextValue}>
            <CreateForm day={1} />
        </CalendarContext.Provider>
    )

    const timeField = screen.getByTestId('city-test')
    userEvent.type(timeField, 'Tokyo Revengers')
    expect(timeField.value).toBe('Tokyo Revengers')
})
