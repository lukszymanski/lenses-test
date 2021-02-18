Changes:

- partly upgraded dependencies to latest versions
- converted whole codebase to typescript
- for typescript i've added path aliases for better imports, with this i needed to also upgrade webpack config to consume TS aliases on build.
- added Filters component for inputs that will be used for filtering messages. Component is generic - so it will adapt to current message structure. There's a ALLOWED_FILTERS list, which fields are allowed to be visible for the user.
- moved Connect component to containers as it has to many connection with the store which makes it a smart component.
- added websocket.hook file with a custom hook for managing WebSocket connections and dealing with messages.
- added auto unsubscribe after 1000 messages for that custom hook
- added simple tests - nothing big, didnt have much time to add more.
- added prettier for code auto format

Comments for the author
Exercise was fun :) If more time give, i would add more unit tests - specially for that custom hook. The purpose of that custom hook is to have a single place that will be responsible to handling the connection and messages that will come in.

Thanks.
