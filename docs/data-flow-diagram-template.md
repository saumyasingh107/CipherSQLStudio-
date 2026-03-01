# Data-Flow Diagram Template (Hand Drawn)

Draw this on paper and include in submission:

1. User taps/clicks `Execute Query`
2. Frontend `handleExecute()` starts loading state
3. Frontend sends `POST /api/query/execute` with `assignmentId` + `query`
4. Express route receives request
5. SQL validator checks allowed query pattern (SELECT/CTE only)
6. Backend opens PostgreSQL read-only transaction
7. PostgreSQL executes query and returns rows/error
8. Backend returns JSON response
9. Frontend updates result/error state
10. Results panel renders table or error message
11. (Optional) Backend stores attempt metadata in MongoDB

Suggested labels:
- API call
- validation
- DB query
- state update
- UI render

