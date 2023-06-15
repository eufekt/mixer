import ChannelHistoryContext from '@/src/contexts/ChannelHistoryContext'
import { render } from '@testing-library/react'
export const withChannelHistoryContextMock = (
    Component,
    mockChannelHistory,
) => {
    const context = {
        channelHistory: mockChannelHistory,
        channelHistoryDispatch: jest.fn(),
    }
    return render(<ChannelHistoryContext.Provider value={context}><Component /></ChannelHistoryContext.Provider >)
}
