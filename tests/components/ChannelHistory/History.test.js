import History from "@/src/components/channelHistory/History"
import { fireEvent } from '@testing-library/react';

import { withChannelHistoryContextMock } from "../mocks/contexts";
describe("History Component", () => {
    const channel1 = { id: 1, url: '/channel1', title: 'mixer', status: 'public' }
    const channel2 = { id: 2, url: '/channel1', title: 'Channel 1', status: 'public' }

    it("should show default mixer link", () => {
        const mockChannelHistory = { list: [channel1] }

        const { getAllByTestId, getByText } = withChannelHistoryContextMock(
            History,
            mockChannelHistory,
        );
        const channels = getAllByTestId("channel")
        expect(channels.length).toBe(1)
        const defaultChannel = channels[0]
        const targetText = getByText('mixer', { container: defaultChannel })
        expect(targetText).toBeInTheDocument();
    })

    it('should hide clear button when there is only the mixer channel', () => {
        const mockChannelHistory = { list: [channel1] }
        const { queryByText } = withChannelHistoryContextMock(
            History,
            mockChannelHistory,
        );
        expect(queryByText('clear')).toBeNull()
    })

    it("should toggle hide-button", () => {
        const mockChannelHistory = { list: [channel1, channel2] }
        const { getByText } = withChannelHistoryContextMock(History, mockChannelHistory)
        const hideButton = getByText('hide')
        expect(hideButton).toBeInTheDocument()
        fireEvent.click(hideButton)
        const showButton = getByText('show history')
        expect(showButton).toBeInTheDocument()
    })

    it('clears the history when the clear button is clicked', async () => {
        const mockChannelHistory = { list: [channel1, channel2] }
        const mockChannelHistoryDispatch = jest.fn();
        const { getByText } = withChannelHistoryContextMock(
            History,
            mockChannelHistory,
            mockChannelHistoryDispatch
        );
        expect(getByText('Channel 1')).toBeInTheDocument();
        fireEvent.click(getByText('clear'));
        expect(mockChannelHistoryDispatch).toHaveBeenCalledWith({ type: 'CLEAN_HISTORY' });
    });
})



