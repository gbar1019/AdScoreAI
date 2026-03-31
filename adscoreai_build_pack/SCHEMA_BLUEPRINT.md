# AdScoreAI — Schema Blueprint

## users
- id
- clerkUserId
- email
- createdAt

## audiences
- id
- userId
- name
- description
- structuredFields
- createdAt
- updatedAt

## scoreJobs
- id
- userId
- contentType
- inputReference
- audienceId
- status
- provider
- errorMessage
- createdAt
- updatedAt

## scoreResults
- id
- jobId
- userId
- overallScore
- confidence
- dimensions
- personas
- recommendations
- rawResponse
- createdAt

## comparisonRuns
- id
- userId
- contentType
- jobIds
- rankedResults
- createdAt

## uploads
- id
- userId
- fileName
- fileType
- storageUrl
- createdAt
