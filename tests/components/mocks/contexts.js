import ChannelHistoryContext from '@/src/contexts/ChannelHistoryContext'
import { render } from '@testing-library/react'
export const withChannelHistoryContextMock = (
    Component,
    mockChannelHistory,
    mockChannelHistoryDispatch = jest.fn()
) => {
    const context = {
        channelHistory: mockChannelHistory,
        channelHistoryDispatch: mockChannelHistoryDispatch,
    }
    return render(<ChannelHistoryContext.Provider value={context}><Component /></ChannelHistoryContext.Provider >)
}
