import History from "@/src/components/channelHistory/History"
import { fireEvent, waitFor } from '@testing-library/react';

import { withChannelHistoryContextMock } from "../mocks/contexts";
describe("History Component", () => {
    const mixerChannel = { id: 1, url: '/channel1', title: 'mixer', status: 'public' }
    it("should show default mixer link", () => {
        let mockChannelHistory = {
            list: [mixerChannel],
        };

        const { getAllByTestId, getByText } = withChannelHistoryContextMock(History, mockChannelHistory)
        const channels = getAllByTestId("channel")
        expect(channels.length).toBe(1)
        const defaultChannel = channels[0]
        const targetText = getByText('mixer', { container: defaultChannel })
        expect(targetText).toBeInTheDocument();
    })
    it('should hide clear button when there is only the mixer channel', () => {
        const mockChannelHistory = {
            list: [mixerChannel]
        };
        const { queryByText } = withChannelHistoryContextMock(
            History,
            mockChannelHistory,
        );
        expect(queryByText('clear')).toBeNull()
    })
    i
    
    it('clears the history when the clear button is clicked', async () => {
        const mockChannelHistoryDispatch = jest.fn();
        const mockChannelHistory = {
            list: [mixerChannel, { id: 2, url: '/channel1', title: 'Channel 1', status: 'public' }]
        };

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



