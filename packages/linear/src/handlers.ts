import { LinearClient } from "@linear/sdk";
import {
  type CreateIssueParams,
  type GetIssueParams,
  type UpdateIssueParams,
  type SearchIssuesParams,
  type CreateProjectParams,
  type GetTeamsParams,
  type GetUserParams,
  type IssueResponse,
  type ProjectResponse,
  type SearchResults,
  type Team,
  type LinearUser,
} from "./types.js";

export class LinearHandlers {
  private client: LinearClient;

  constructor(apiKey: string) {
    this.client = new LinearClient({ apiKey });
  }

  /**
   * Create a new issue
   */
  async createIssue(params: CreateIssueParams): Promise<IssueResponse> {
    try {
      const issuePayload = await this.client.createIssue({
        title: params.title,
        description: params.description,
        teamId: params.teamId,
        assigneeId: params.assigneeId,
        priority: params.priority,
        stateId: params.stateId,
        projectId: params.projectId,
        labelIds: params.labelIds,
        estimate: params.estimate,
        dueDate: params.dueDate ? new Date(params.dueDate) : undefined,
      });

      const issue = await issuePayload.issue;
      if (!issue) {
        throw new Error("Failed to create issue");
      }

      // Await related objects
      const state = issue.state ? await issue.state : undefined;
      const assignee = issue.assignee ? await issue.assignee : undefined;
      const creator = issue.creator ? await issue.creator : undefined;
      const team = issue.team ? await issue.team : undefined;

      return {
        id: issue.id,
        identifier: issue.identifier,
        title: issue.title,
        description: issue.description || undefined,
        state: state
          ? {
              id: state.id,
              name: state.name,
              type: state.type,
            }
          : undefined,
        priority: issue.priority as 0 | 1 | 2 | 3 | 4 | undefined,
        assignee: assignee
          ? {
              id: assignee.id,
              name: assignee.name,
              email: assignee.email,
            }
          : undefined,
        creator: creator
          ? {
              id: creator.id,
              name: creator.name,
              email: creator.email,
            }
          : undefined,
        team: team
          ? {
              id: team.id,
              name: team.name,
              key: team.key,
              description: team.description || undefined,
            }
          : undefined,
        createdAt: issue.createdAt.toISOString(),
        updatedAt: issue.updatedAt.toISOString(),
        estimate: issue.estimate || undefined,
        dueDate: issue.dueDate?.toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to create issue: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Get issue details by ID
   */
  async getIssue(params: GetIssueParams): Promise<IssueResponse> {
    try {
      const issue = await this.client.issue(params.id);
      if (!issue) {
        throw new Error(`Issue not found: ${params.id}`);
      }

      // Await related objects
      const state = issue.state ? await issue.state : undefined;
      const assignee = issue.assignee ? await issue.assignee : undefined;
      const creator = issue.creator ? await issue.creator : undefined;
      const team = issue.team ? await issue.team : undefined;

      return {
        id: issue.id,
        identifier: issue.identifier,
        title: issue.title,
        description: issue.description || undefined,
        state: state
          ? {
              id: state.id,
              name: state.name,
              type: state.type,
            }
          : undefined,
        priority: issue.priority as 0 | 1 | 2 | 3 | 4 | undefined,
        assignee: assignee
          ? {
              id: assignee.id,
              name: assignee.name,
              email: assignee.email,
            }
          : undefined,
        creator: creator
          ? {
              id: creator.id,
              name: creator.name,
              email: creator.email,
            }
          : undefined,
        team: team
          ? {
              id: team.id,
              name: team.name,
              key: team.key,
              description: team.description || undefined,
            }
          : undefined,
        createdAt: issue.createdAt.toISOString(),
        updatedAt: issue.updatedAt.toISOString(),
        estimate: issue.estimate || undefined,
        dueDate: issue.dueDate?.toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to get issue: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Update an existing issue
   */
  async updateIssue(params: UpdateIssueParams): Promise<IssueResponse> {
    try {
      const { id, ...updateData } = params;
      const issuePayload = await this.client.updateIssue(id, {
        title: updateData.title,
        description: updateData.description,
        assigneeId: updateData.assigneeId,
        priority: updateData.priority,
        stateId: updateData.stateId,
        projectId: updateData.projectId,
        labelIds: updateData.labelIds,
        estimate: updateData.estimate,
        dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
      });

      const issue = await issuePayload.issue;
      if (!issue) {
        throw new Error("Failed to update issue");
      }

      // Await related objects
      const state = issue.state ? await issue.state : undefined;
      const assignee = issue.assignee ? await issue.assignee : undefined;
      const creator = issue.creator ? await issue.creator : undefined;
      const team = issue.team ? await issue.team : undefined;

      return {
        id: issue.id,
        identifier: issue.identifier,
        title: issue.title,
        description: issue.description || undefined,
        state: state
          ? {
              id: state.id,
              name: state.name,
              type: state.type,
            }
          : undefined,
        priority: issue.priority as 0 | 1 | 2 | 3 | 4 | undefined,
        assignee: assignee
          ? {
              id: assignee.id,
              name: assignee.name,
              email: assignee.email,
            }
          : undefined,
        creator: creator
          ? {
              id: creator.id,
              name: creator.name,
              email: creator.email,
            }
          : undefined,
        team: team
          ? {
              id: team.id,
              name: team.name,
              key: team.key,
              description: team.description || undefined,
            }
          : undefined,
        createdAt: issue.createdAt.toISOString(),
        updatedAt: issue.updatedAt.toISOString(),
        estimate: issue.estimate || undefined,
        dueDate: issue.dueDate?.toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to update issue: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Search for issues
   */
  async searchIssues(params: SearchIssuesParams): Promise<SearchResults> {
    try {
      const filter: any = {};

      if (params.teamId) filter.team = { id: { eq: params.teamId } };
      if (params.assigneeId)
        filter.assignee = { id: { eq: params.assigneeId } };
      if (params.stateId) filter.state = { id: { eq: params.stateId } };
      if (params.projectId) filter.project = { id: { eq: params.projectId } };
      if (params.priority !== undefined)
        filter.priority = { eq: params.priority };

      const issuesConnection = await this.client.issues({
        filter: Object.keys(filter).length > 0 ? filter : undefined,
        first: params.limit || 25,
      });

      const issues = await Promise.all(
        issuesConnection.nodes.map(async (issue) => {
          // Await related objects
          const state = issue.state ? await issue.state : undefined;
          const assignee = issue.assignee ? await issue.assignee : undefined;
          const creator = issue.creator ? await issue.creator : undefined;
          const team = issue.team ? await issue.team : undefined;

          return {
            id: issue.id,
            identifier: issue.identifier,
            title: issue.title,
            description: issue.description || undefined,
            state: state
              ? {
                  id: state.id,
                  name: state.name,
                  type: state.type,
                }
              : undefined,
            priority: issue.priority as 0 | 1 | 2 | 3 | 4 | undefined,
            assignee: assignee
              ? {
                  id: assignee.id,
                  name: assignee.name,
                  email: assignee.email,
                }
              : undefined,
            creator: creator
              ? {
                  id: creator.id,
                  name: creator.name,
                  email: creator.email,
                }
              : undefined,
            team: team
              ? {
                  id: team.id,
                  name: team.name,
                  key: team.key,
                  description: team.description || undefined,
                }
              : undefined,
            createdAt: issue.createdAt.toISOString(),
            updatedAt: issue.updatedAt.toISOString(),
            estimate: issue.estimate || undefined,
            dueDate: issue.dueDate?.toISOString(),
          };
        })
      );

      return {
        issues,
        totalCount: issuesConnection.pageInfo.hasNextPage
          ? params.limit || 25
          : issues.length,
      };
    } catch (error) {
      throw new Error(
        `Failed to search issues: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Create a new project
   */
  async createProject(params: CreateProjectParams): Promise<ProjectResponse> {
    try {
      const projectPayload = await this.client.createProject({
        name: params.name,
        description: params.description,
        leadId: params.leadId,
        memberIds: params.memberIds,
        teamIds: [], // Required parameter - empty array for now
        targetDate: params.targetDate ? new Date(params.targetDate) : undefined,
      });

      const project = await projectPayload.project;
      if (!project) {
        throw new Error("Failed to create project");
      }

      // Await related objects
      const lead = project.lead ? await project.lead : undefined;

      return {
        id: project.id,
        name: project.name,
        description: project.description || undefined,
        status: "planned", // Default status since Linear doesn't have a status field
        lead: lead
          ? {
              id: lead.id,
              name: lead.name,
              email: lead.email,
            }
          : undefined,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        targetDate: project.targetDate?.toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to create project: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Get all teams
   */
  async getTeams(params: GetTeamsParams = {}): Promise<Team[]> {
    try {
      const teamsConnection = await this.client.teams({
        first: params.limit || 50,
      });

      return teamsConnection.nodes.map((team) => ({
        id: team.id,
        name: team.name,
        key: team.key,
        description: team.description || undefined,
      }));
    } catch (error) {
      throw new Error(
        `Failed to get teams: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Get user details (self or by ID)
   */
  async getUser(params: GetUserParams = {}): Promise<LinearUser> {
    try {
      let user;
      if (params.id) {
        user = await this.client.user(params.id);
      } else {
        user = await this.client.viewer;
      }

      if (!user) {
        throw new Error("User not found");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      throw new Error(
        `Failed to get user: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
